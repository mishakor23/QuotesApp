import { Component, OnInit } from '@angular/core';
import {CitationService} from '../../services/citation.service';
import {ActivatedRoute} from '@angular/router/src/router_state';
import {Observable} from 'rxjs/Observable';
import {Citation} from '../../models/citation';
import {Params} from '../../../../node_modules/@angular/router/src/shared';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  citations$:Observable<Citation[]>;
  user$:Observable<User>;

  constructor(private citService:CitationService, private usersService:UsersService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.user$ = this.route.params.switchMap( (params) => {
      let uid = params["id"];
      return this.usersService.getUserById(uid);
    });

    this.citations$ = this.route.params.switchMap( (params) => {
      let uid = params["id"];
      return this.citService.getUserCitations(uid);
    });
  }

}
