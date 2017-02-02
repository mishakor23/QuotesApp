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
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
export var ProfilePageComponent = (function () {
    function ProfilePageComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        console.log();
    }
    ProfilePageComponent.prototype.ngOnInit = function () {
        this.user$ = this.userService.getUserInfoStream();
    };
    ProfilePageComponent.prototype.getActiveTabIndex = function () {
        if (this.router.url === "/profile/citations") {
            return 0;
        }
        else {
            return 1;
        }
    };
    ProfilePageComponent = __decorate([
        Component({
            selector: 'app-profile-page',
            templateUrl: './profile-page.component.html',
            styleUrls: ['./profile-page.component.scss']
        }), 
        __metadata('design:paramtypes', [Router, UserService])
    ], ProfilePageComponent);
    return ProfilePageComponent;
}());
//# sourceMappingURL=profile-page.component.js.map