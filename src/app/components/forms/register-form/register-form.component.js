var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { EMAIL, STRONG_PASS, MEDIUM_PASS } from '../../../utils/RegexPatterns';
import { UtilsService } from '../../../services/utils.service';
import { RegisterCredentials } from '../../../models/registerCredentials';
import { UserService } from '../../../services/user.service';
export var RegisterFormComponent = (function () {
    function RegisterFormComponent(fb, utilsService, userService) {
        this.fb = fb;
        this.utilsService = utilsService;
        this.userService = userService;
        this.minUsernameLength = 4;
        this.maxUsernameLength = 16;
        this.minPasswordLength = 6;
    }
    RegisterFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            email: ["", Validators.compose([Validators.required, Validators.pattern(EMAIL)])],
            password: ["", Validators.compose([Validators.required, Validators.minLength(this.minPasswordLength)])],
            username: ["", Validators.compose([
                    Validators.required,
                    Validators.minLength(this.minUsernameLength),
                    Validators.maxLength(this.maxUsernameLength)])]
        });
        var emailStream$ = this.form.controls["email"].valueChanges;
        var passwordStream$ = this.form.controls["password"].valueChanges;
        var usernameStream$ = this.form.controls["username"].valueChanges;
        emailStream$.subscribe(function (data) {
            _this.emailErrors(data);
        });
        usernameStream$.subscribe(function (data) {
            _this.usernameErrors(data);
        });
        passwordStream$.subscribe(function (data) {
            _this.passwordErrors(data);
            _this.passwordStrength(data);
        });
    };
    RegisterFormComponent.prototype.emailErrors = function (value) {
        if (value.length == 0) {
            this.emailError = "Email is required";
        }
        else if (!this.form.controls["email"].valid) {
            this.emailError = "Email is not valid";
        }
        else {
            this.emailError = "";
        }
    };
    RegisterFormComponent.prototype.usernameErrors = function (value) {
        if (value.length == 0) {
            this.usernameError = "Username is required";
        }
        else if (value.length < this.minUsernameLength) {
            this.usernameError = "Username is too short (4 characters minimum)";
        }
        else if (value.length > this.maxUsernameLength) {
            this.usernameError = "Username is too long (16 characters maximum)";
        }
        else {
            this.usernameError = "";
        }
    };
    RegisterFormComponent.prototype.passwordStrength = function (value) {
        var passCategory = 0;
        if (RegExp(STRONG_PASS).test(value)) {
            passCategory = 100;
        }
        else if (RegExp(MEDIUM_PASS).test(value)) {
            passCategory = 60;
        }
        else if (value.length > this.minPasswordLength) {
            passCategory = 30;
        }
        else {
            passCategory = 0;
        }
        this.passStrength = Math.min(passCategory * (value.length / 15), 100);
    };
    RegisterFormComponent.prototype.passwordErrors = function (value) {
        this.passwordError = "";
        if (value.length == 0) {
            this.passwordError = "Password is required";
        }
        else if (value.length < this.minPasswordLength) {
            this.passwordError = "Password is too short";
        }
    };
    RegisterFormComponent.prototype.onError = function (msg) {
        this.utilsService.pushMessage(msg);
    };
    RegisterFormComponent.prototype.onSubmit = function () {
        if (this.form.valid) {
            var cred = new RegisterCredentials();
            cred.username = this.form.controls["username"].value;
            cred.email = this.form.controls["email"].value;
            cred.password = this.form.controls["password"].value;
            this.userService.signUp(cred);
        }
        else {
            this.onError("Form validation failed");
        }
    };
    RegisterFormComponent = __decorate([
        Component({
            selector: 'app-register-form',
            templateUrl: './register-form.component.html',
            styleUrls: ['./register-form.component.scss']
        }), 
        __metadata('design:paramtypes', [FormBuilder, UtilsService, UserService])
    ], RegisterFormComponent);
    return RegisterFormComponent;
}());
//# sourceMappingURL=register-form.component.js.map