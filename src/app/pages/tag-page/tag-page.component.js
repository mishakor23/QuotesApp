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
import { CitationService } from '../../services/citation.service';
import { ActivatedRoute } from '@angular/router/src/router_state';
export var TagPageComponent = (function () {
    function TagPageComponent(citService, route) {
        this.citService = citService;
        this.route = route;
        this.tag = "";
    }
    TagPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.tag = params["id"];
            _this.citations$ = _this.citService.getCitationsByTag(_this.tag);
        });
    };
    TagPageComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    TagPageComponent = __decorate([
        Component({
            selector: 'app-tag-page',
            templateUrl: './tag-page.component.html',
            styleUrls: ['./tag-page.component.scss']
        }), 
        __metadata('design:paramtypes', [CitationService, ActivatedRoute])
    ], TagPageComponent);
    return TagPageComponent;
}());
//# sourceMappingURL=tag-page.component.js.map