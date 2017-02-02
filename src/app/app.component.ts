import {Component, OnInit} from '@angular/core';
import {UtilsService} from './services/utils.service';
import {MdSnackBarConfig} from '../../node_modules/@angular/material/snack-bar/snack-bar-config';
import {MdSnackBar} from '../../node_modules/@angular/material/snack-bar/snack-bar';
import {MdDialog} from '../../node_modules/@angular/material/dialog/dialog';
import {MdDialogConfig} from '../../node_modules/@angular/material/dialog/dialog-config';
import {RegisterFormComponent} from './components/forms/register-form/register-form.component';
import {CitationFormComponent} from './components/forms/citation-form/citation-form.component';
import {LoginFormComponent} from './components/forms/login-form/login-form.component';
import {CitationService} from './services/citation.service';
import {AuthService} from './services/auth.service';
import {UserBasicInfo} from './models/userBasicInfo';
import {Observable} from '../../node_modules/rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  user$:Observable<UserBasicInfo>;

  constructor(private utilsService:UtilsService,
              private snackBar:MdSnackBar,
              private userService:AuthService)
  {
    this.user$ = this.userService.userStream$;
  }

  ngOnInit(): void {
    this.utilsService.onMessage().subscribe((msg) => {
      this.showMessageBar(msg);
    });
  }

  onLogOut():void
  {
    this.userService.logout();
  }

  private showMessageBar(msg:string):void
  {
    let config = new MdSnackBarConfig();
    config.duration = 1500;
    this.snackBar.open(msg, "", config);
  }
}
