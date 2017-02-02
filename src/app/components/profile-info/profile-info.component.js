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
import { Input } from '@angular/core/src/metadata/directives';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
export var ProfileInfoComponent = (function () {
    function ProfileInfoComponent(userService) {
        this.userService = userService;
    }
    ProfileInfoComponent.prototype.ngOnInit = function () {
    };
    ProfileInfoComponent.prototype.onSubscribe = function () {
        console.log("Subscribe to user " + this.user.username);
        //this.userService
    };
    ProfileInfoComponent.prototype.onUnsubscribe = function () {
        console.log("Unsubscribe from user " + this.user.username);
    };
    __decorate([
        Input(), 
        __metadata('design:type', User)
    ], ProfileInfoComponent.prototype, "user", void 0);
    ProfileInfoComponent = __decorate([
        Component({
            selector: 'app-profile-info',
            templateUrl: './profile-info.component.html',
            styleUrls: ['./profile-info.component.scss']
        }), 
        __metadata('design:paramtypes', [UserService])
    ], ProfileInfoComponent);
    return ProfileInfoComponent;
}());
//# sourceMappingURL=profile-info.component.js.map