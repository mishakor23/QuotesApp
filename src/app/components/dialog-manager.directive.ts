import { Directive, OnInit } from '@angular/core';
import {RegisterFormComponent} from './forms/register-form/register-form.component';
import {CitationFormComponent} from './forms/citation-form/citation-form.component';
import {LoginFormComponent} from './forms/login-form/login-form.component';
import {UtilsService} from '../services/utils.service';
import {MdDialog} from '@angular/material';
import {CitationService} from '../services/citation.service';
import {AuthService} from '../services/auth.service';
import {MdDialogConfig} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Directive({
  selector: '[appDialogManager]'
})
export class DialogManagerDirective implements OnInit{

  dialogConfig: MdDialogConfig = {
    disableClose: false,
    width: '60%',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };

  constructor(private utilsService:UtilsService,
              public dialog: MdDialog,
              private citService:CitationService,
              private userService:AuthService, private router:Router) { }

  ngOnInit() {
    this.utilsService.onDialog().subscribe( (dial) => {
      switch(dial) {
        case UtilsService.CITATION:
          return this.openCitationDialog();
        case UtilsService.REGISTER:
          return this.openRegisterDialog();
        case UtilsService.LOGIN:
          return this.openLoginDialog();
      }
    });
  }

  openRegisterDialog()
  {
    let formDialog = this.dialog.open(RegisterFormComponent, this.dialogConfig);
    let form:RegisterFormComponent = formDialog.componentInstance;
    let subscr:Subscription = form.submitted.subscribe(ev => {
      //console.log("Submitted ", ev);
      this.userService.signUp(ev).then( succ => {
        this.utilsService.pushMessage("Registered successfully as " + succ.auth.displayName);
        formDialog.close();
        this.router.navigate(['/profile']);
        subscr.unsubscribe();
      }).catch( (err:Error) => {
        this.utilsService.pushMessage("Error: " + err.message);
      });

    });
  }

  openCitationDialog()
  {
    let formDialog = this.dialog.open(CitationFormComponent, this.dialogConfig);
    let form:CitationFormComponent = formDialog.componentInstance;
    let subscr:Subscription = form.submitted.subscribe(ev => {
      //console.log("Submitted ", ev);
      this.citService.addCitation(ev).subscribe(succ => {
        this.utilsService.pushMessage("Citation added successfully");
        formDialog.close();
        subscr.unsubscribe();
      }, (err:Error) => {
        this.utilsService.pushMessage("Error: " + err.message);
      });

    });
  }

  openLoginDialog()
  {
    let formDialog = this.dialog.open(LoginFormComponent, this.dialogConfig);
    let form:LoginFormComponent = formDialog.componentInstance;
    let subscr:Subscription = form.submitted.subscribe(ev => {
      //console.log("Submitted ", ev);
      this.userService.loginWithEmail(ev).then(succ => {
        this.utilsService.pushMessage("Logged in successfully as "+ succ.auth.displayName);
        formDialog.close();
        subscr.unsubscribe();
      }).catch( (err:Error) => {
        this.utilsService.pushMessage("Error: " + err.message);
      });

    });

  }
}
