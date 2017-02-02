import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {EMAIL, STRONG_PASS, MEDIUM_PASS} from '../../../utils/RegexPatterns';
import {UtilsService} from '../../../services/utils.service';
import {RegisterCredentials} from '../../../models/registerCredentials';
import {AuthService} from '../../../services/auth.service';
import {Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output() submitted:EventEmitter<RegisterCredentials> = new EventEmitter<RegisterCredentials>();

  minUsernameLength:number = 4;
  maxUsernameLength:number = 16;
  minPasswordLength:number = 6;

  emailError:string;
  passwordError:string;
  usernameError:string;

  form: FormGroup;

  passStrength:number;

  constructor(private fb: FormBuilder, private utilsService:UtilsService, private userService:AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern(EMAIL)])],
      password: ["", Validators.compose([Validators.required, Validators.minLength(this.minPasswordLength)])],
      username: ["", Validators.compose([
        Validators.required,
        Validators.minLength(this.minUsernameLength),
        Validators.maxLength(this.maxUsernameLength)])]
    });

    let emailStream$ = this.form.controls["email"].valueChanges;
    let passwordStream$ = this.form.controls["password"].valueChanges;
    let usernameStream$ = this.form.controls["username"].valueChanges;

    emailStream$.subscribe( (data) => {
      this.emailErrors(data);
    });
    usernameStream$.subscribe( (data) => {
      this.usernameErrors(data);
    });
    passwordStream$.subscribe( (data) => {
      this.passwordErrors(data);
      this.passwordStrength(data);
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

  usernameErrors(value)
  {
    if(value.length == 0)
    {
      this.usernameError = "Username is required";
    }
    else if(value.length < this.minUsernameLength){
      this.usernameError = "Username is too short (4 characters minimum)";
    }
    else if(value.length > this.maxUsernameLength)
    {
      this.usernameError = "Username is too long (16 characters maximum)";
    }
    else {
      this.usernameError = "";
    }
  }

  passwordStrength(value){
    let passCategory: number = 0;
    if(RegExp(STRONG_PASS).test(value))
    {
      passCategory = 100;
    }
    else if(RegExp(MEDIUM_PASS).test(value))
    {
      passCategory = 60;
    }
    else if(value.length > this.minPasswordLength)
    {
      passCategory = 30;
    }
    else {
      passCategory = 0;
    }
    this.passStrength = Math.min(passCategory*(value.length/30), 100);

  }

  passwordErrors(value){
    this.passwordError = "";
    if(value.length == 0)
    {
      this.passwordError = "Password is required";
    }
    else if(value.length < this.minPasswordLength)
    {
      this.passwordError = "Password is too short";
    }
  }

  onError(msg:string) {
    this.utilsService.pushMessage(msg);
  }

  onSubmit()
  {
    if(this.form.valid)
    {
      let cred:RegisterCredentials = new RegisterCredentials();

      cred.username = this.form.controls["username"].value;
      cred.email = this.form.controls["email"].value;
      cred.password = this.form.controls["password"].value;
      this.submitted.emit(cred);
    }
    else {
      this.onError("Form validation failed");
    }
  }

}
