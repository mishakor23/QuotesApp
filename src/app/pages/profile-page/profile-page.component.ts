import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../../models/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  private user$:Observable<User>;

  constructor(private router: Router, private userService:AuthService) {
  }

  ngOnInit() {
    this.user$ = this.userService.userStream$;
  }

  getActiveTabIndex():number
  {
    if(this.router.url === "/profile/citations")
    {
      return 0;
    }
    else {
      return 1;
    }
  }

}
