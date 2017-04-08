import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {Observable} from 'rxjs/Rx';
import {AngularFire} from 'angularfire2';
import {Citation} from '../models/citation';
import {AuthService} from './auth.service';


@Injectable()
export class UsersService {

  constructor(public af:AngularFire) {

  }


  calculateRank(uid:string):Observable<Citation[]>
  {
    if(!uid) return;
    console.log("Calculate rank", uid);
    return this.af.database.list('/citations/', {
      query: {
        orderByChild: 'user/id',
        equalTo: uid
      }
    }).map(cits => {
      return cits.map(cit => Citation.unpack(cit));
    }).do(console.log);
  }

  subscribeTo(id:string):Observable<any[]>
  {
    //console.log("Subscribe to "+id);
    if(!AuthService.AUTH_USER)
        return Observable.of(null);

    this.af.database.object(`/users/${id}/subscribers/${AuthService.AUTH_USER.id}`).set(true);
    return this.initialPublishToFeed(id, AuthService.AUTH_USER.id);
  }

  unsubscribeFrom(id:string):Observable<any[]>
  {
    if(!AuthService.AUTH_USER)
        return Observable.of(null);

    this.af.database.object(`/users/${id}/subscribers/${AuthService.AUTH_USER.id}`).remove();

    return this.deleteUserFromFeed(AuthService.AUTH_USER.id,id);
  }

  public getUserById(id:string):Observable<User>
  {
    return this.af.database.object(`/users/${id}`).map( (uData) => {
      return User.unpack(uData);
    });
  }

  public deleteUserFromFeed(feedId:string, userId:string):Observable<any>
  {
    const feed = this.af.database.list(`/feeds/${feedId}/`);
    return this.af.database.list('/citations/', {
      query: {
        orderByChild: 'user/id',
        equalTo: userId
      }
    }).map(cits => cits.map(cit => cit.$key))
      .switchMap( (ids:string[]) => {
        return Observable.combineLatest(ids.map(id => {
          return feed.remove(id);
        }));
      });
  }

  public initialPublishToFeed(from:string, to:string):Observable<any>
  {
    console.log(`Publish to ${to} feed from ${from}`);
    return this.af.database.list('/citations/', {
      query: {
        orderByChild: 'user/id',
        equalTo: from
      }
    }).do(console.log).map(cits => cits.map(cit => cit.$key))
        .do(console.log)
      .switchMap(ids => this.publishIdsToFeed(ids, to));
  }

  private publishIdsToFeed(ids:string[], to:string):Observable<any[]>
  {
    console.log("Publish ids to feed");
    return Observable.fromPromise(
      Promise.all(ids.map( (id) => this.af.database.object(`/feeds/${to}/${id}`).set(true)))
    );
  }

}
