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
import { CitationService } from '../../../services/citation.service';
import { UserService } from '../../../services/user.service';
export var UserCitationsPageComponent = (function () {
    function UserCitationsPageComponent(citService, userService) {
        this.citService = citService;
        this.userService = userService;
    }
    UserCitationsPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUserInfoStream().subscribe(function (user) {
            console.log("LOADING CITATIONS: " + user.id);
            _this.citations$ = _this.citService.getUserCitations(user.id);
        });
    };
    UserCitationsPageComponent.prototype.addCitation = function (data) {
        this.citService.addCitation(data);
    };
    UserCitationsPageComponent = __decorate([
        Component({
            selector: 'app-user-citations-page',
            templateUrl: './user-citations-page.component.html',
            styleUrls: ['./user-citations-page.component.scss']
        }), 
        __metadata('design:paramtypes', [CitationService, UserService])
    ], UserCitationsPageComponent);
    return UserCitationsPageComponent;
}());
//# sourceMappingURL=user-citations-page.component.js.map