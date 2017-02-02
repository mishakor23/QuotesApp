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
import { UtilsService } from '../../../services/utils.service';
import { EMAIL } from '../../../utils/RegexPatterns';
import { UserService } from '../../../services/user.service';
export var LoginFormComponent = (function () {
    function LoginFormComponent(fb, utilsService, userService) {
        this.fb = fb;
        this.utilsService = utilsService;
        this.userService = userService;
    }
    LoginFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            email: ["", Validators.compose([Validators.required, Validators.pattern(EMAIL)])],
            password: ["", Validators.required]
        });
        var emailStream$ = this.form.controls["email"].valueChanges;
        var passwordStream$ = this.form.controls["password"].valueChanges;
        emailStream$.subscribe(function (data) {
            _this.emailErrors(data);
        });
        passwordStream$.subscribe(function (data) {
            _this.passwordErrors(data);
        });
    };
    LoginFormComponent.prototype.emailErrors = function (value) {
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
    LoginFormComponent.prototype.passwordErrors = function (value) {
        this.passwordError = "";
        if (value.length == 0) {
            this.passwordError = "Password is required";
        }
    };
    LoginFormComponent.prototype.onError = function (msg) {
        this.utilsService.pushMessage(msg);
    };
    LoginFormComponent.prototype.onSubmit = function () {
        if (this.form.valid) {
            var email = this.form.controls["email"].value;
            var password = this.form.controls["password"].value;
            var cred = { email: email, password: password };
            this.userService.loginWithEmail(cred);
        }
        else {
            this.onError("Form validation failed");
        }
    };
    LoginFormComponent = __decorate([
        Component({
            selector: 'app-login-form',
            templateUrl: './login-form.component.html',
            styleUrls: ['./login-form.component.scss']
        }), 
        __metadata('design:paramtypes', [FormBuilder, UtilsService, UserService])
    ], LoginFormComponent);
    return LoginFormComponent;
}());
//# sourceMappingURL=login-form.component.js.map