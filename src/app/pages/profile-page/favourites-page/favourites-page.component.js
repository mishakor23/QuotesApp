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
export var FavouritesPageComponent = (function () {
    function FavouritesPageComponent(citService, userService) {
        this.citService = citService;
        this.userService = userService;
    }
    FavouritesPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUserInfoStream().subscribe(function (user) {
            console.log("LOADING CITATIONS: " + user.id);
            _this.citations$ = _this.citService.getUserFavourites(user.id);
            _this.citations$.subscribe(function (cits) {
                console.log("Got citations");
                console.log(cits);
            });
        });
    };
    FavouritesPageComponent = __decorate([
        Component({
            selector: 'app-favourites-page',
            templateUrl: './favourites-page.component.html',
            styleUrls: ['./favourites-page.component.scss']
        }), 
        __metadata('design:paramtypes', [CitationService, UserService])
    ], FavouritesPageComponent);
    return FavouritesPageComponent;
}());
//# sourceMappingURL=favourites-page.component.js.map