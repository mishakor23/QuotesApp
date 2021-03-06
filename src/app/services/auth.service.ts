import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {Observable} from 'rxjs/Rx';
import {RegisterCredentials} from '../models/registerCredentials';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import {AuthConfiguration} from 'angularfire2/auth';
import {EmailPasswordCredentials} from 'angularfire2/auth';
import {AuthMethods, AuthProviders} from 'angularfire2/auth/auth_backend';


@Injectable()
export class AuthService {

  private loggedIn:boolean = false;
  public static AUTH_USER:User = null;


  public userStream$:Observable<User>;

  constructor(public af:AngularFire) {

    this.userStream$ = af.auth
      .switchMap((data) => {
      if(!data) return Observable.of(null);
      return this.af.database.object(`/users/${data.auth.uid}`);
    }).map( (uData) => {
        if(!uData) return;
        return User.unpack(uData);
      });

    this.userStream$.subscribe( (user) => {
      this.loggedIn = !!(user);
      if(!user) return;
      AuthService.AUTH_USER = user;
    });
  }


  loginWithOauth(config?:AuthConfiguration):firebase.Promise<FirebaseAuthState>
  {
    return this.af.auth.login(config).then( (userData:FirebaseAuthState) => {
      return userData;
    }).catch(err => {
      //console.log("login error "+err);
    });
  }

  loginWithEmail(credentials: EmailPasswordCredentials,
                 config: AuthConfiguration =
                   {provider: AuthProviders.Password, method: AuthMethods.Password}): firebase.Promise<FirebaseAuthState>
  {
    //console.log("log in");
    //console.log(credentials);
    return this.af.auth.login(credentials, config).then( (userData:FirebaseAuthState) => {
      return userData;
    });
  }

  signUp(credentials: RegisterCredentials): firebase.Promise<FirebaseAuthState>
  {
    return this.af.auth.createUser(credentials).then( (userData:FirebaseAuthState) => {
      //console.log(userData);
      userData.auth.updateProfile({displayName: credentials.username, photoURL: null});

      let user = new User("", credentials.username, credentials.email);

      return this.af.database.object(`/users/${userData.uid}`).$ref.set(User.pack(user));

    }).then( () => {
      return this.loginWithEmail(credentials);
    });
  }

  public isLoggedIn():boolean
  {
    return this.loggedIn;
  }

  logout():Promise<void>
  {
    return this.af.auth.logout();
  }
}
