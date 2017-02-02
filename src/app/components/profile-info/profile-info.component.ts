import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core/src/metadata/directives';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {

  @Input() user: User = new User();

  constructor(public authService:AuthService, public userService:UsersService) {
  }

  ngOnInit(): void {
  }

  getSubIndex()
  {
    if(!this.user) return -1;
    //console.log("USER = ", this.user);
    return this.user.subscribers.indexOf(AuthService.AUTH_USER.id);
  }

  onToggleChange()
  {
    if(this.getSubIndex() > -1)
    {
      this.onUnsubscribe();
    }
    else {
      this.onSubscribe();
    }
  }

  onSubscribe(){
    //this.user.subscribers.push(this.authService.currentUser.id);
    this.userService.subscribeTo(this.user.id).subscribe( () => {
      console.log("Subscribed to user "+this.user.username);
    });

  }

  onUnsubscribe(){
    //this.user.subscribers.splice(this.subIndex(), 1);
    this.userService.unsubscribeFrom(this.user.id).subscribe( () => {
      console.log("Unsubscribe from user "+this.user.username);
    });
  }

}
