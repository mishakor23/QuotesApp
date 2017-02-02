var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { AngularFire } from 'angularfire2';
import { UserBasicInfo } from '../models/userBasicInfo';
export var UserService = (function () {
    function UserService(http, af) {
        var _this = this;
        this.http = http;
        this.af = af;
        this.loggedIn = false;
        var ar = [1, 2, 4, 6];
        var newAr = ar.filter(function (elem) {
            if (elem > 2)
                return true;
            return false;
        });
        this.af.auth.subscribe(function (data) {
            _this.loggedIn = (data != null);
            if (!data)
                return;
            _this.currentUser = new UserBasicInfo(data.auth.uid, data.auth.displayName, data.auth.email);
            //console.log(_this.currentUser);
        });
    }
    UserService.prototype.loginWithOauth = function (config) {
        return this.af.auth.login(config).then(function (userData) {
            return userData;
        }).catch(function (err) {
            //console.log("login error " + err);
        });
    };
    UserService.prototype.loginWithEmail = function (credentials, config) {
        //console.log("log in");
        //console.log(this.currentUser);
        return this.af.auth.login(credentials).then(function (userData) {
            return userData;
        }).catch(function (err) {
            //console.log("login error " + err);
        });
    };
    UserService.prototype.signUp = function (credentials) {
        var _this = this;
        return this.af.auth.createUser(credentials).then(function (userData) {
            //console.log(userData);
            userData.auth.updateProfile({ displayName: credentials.username, photoURL: null });
            _this.loginWithEmail(credentials);
        }).catch(function (err) {
            //console.log("signUp error " + err);
        });
    };
    UserService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    UserService.prototype.logout = function () {
        this.af.auth.logout();
    };
    UserService.prototype.getCurrentUserInfo = function () {
        return this.currentUser;
    };
    UserService.prototype.getUserInfoStream = function () {
        return this.af.auth.map(function (data) {
            return new UserBasicInfo(data.auth.uid, data.auth.displayName, data.auth.email);
        });
    };
    Object.defineProperty(UserService.prototype, "userId", {
        get: function () {
            if (!this.currentUser)
                return "";
            return this.currentUser.id;
        },
        enumerable: true,
        configurable: true
    });
    UserService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error("UsersService" + errMsg); // log to console instead
        return Observable.throw(errMsg);
    };
    UserService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, AngularFire])
    ], UserService);
    return UserService;
}());
//# sourceMappingURL=user.service.js.map