import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {EMAIL} from '../../../utils/RegexPatterns';
import {AuthService} from '../../../services/auth.service';
import {EmailPasswordCredentials} from 'angularfire2/auth';
import {Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() submitted:EventEmitter<EmailPasswordCredentials> = new EventEmitter<EmailPasswordCredentials>();
  emailError:string;
  passwordError:string;
  form: FormGroup;

  constructor(private fb: FormBuilder, private utilsService:UtilsService, private userService:AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern(EMAIL)])],
      password: ["", Validators.required]
    });

    let emailStream$ = this.form.controls["email"].valueChanges;
    let passwordStream$ = this.form.controls["password"].valueChanges;

    emailStream$.subscribe( (data) => {
      this.emailErrors(data);
    });
    passwordStream$.subscribe( (data) => {
      this.passwordErrors(data)
    });

  }

  emailErrors(value)
  {
    if(value.length == 0)
    {
      this.emailError = "Email is required";
    }
    else if(!this.form.controls["email"].valid){
      this.emailError = "Email is not valid";
    }
    else {
      this.emailError = "";
    }
  }

  passwordErrors(value){
    this.passwordError = "";
    if(value.length == 0)
    {
      this.passwordError = "Password is required";
    }
  }

  onError(msg:string) {
    this.utilsService.pushMessage(msg);
  }

  onSubmit()
  {
    if(this.form.valid)
    {
      let email = this.form.controls["email"].value;
      let password = this.form.controls["password"].value;
      let cred:EmailPasswordCredentials = {email, password};
      this.submitted.emit(cred);
    }
    else {
      this.onError("Form validation failed");
    }
  }

}
