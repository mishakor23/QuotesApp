var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Citation } from '../../models/citation';
import { CitationService } from '../../services/citation.service';
import { UserService } from '../../services/user.service';
export var CitationComponent = (function () {
    function CitationComponent(citService, userService) {
        this.citService = citService;
        this.userService = userService;
        this.deleted = new EventEmitter();
        this.citation = new Citation();
    }
    CitationComponent.prototype.ngOnInit = function () {
        //this.citation = new Citation();
    };
    CitationComponent.prototype.canRate = function () {
        return this.userService.isLoggedIn();
    };
    CitationComponent.prototype.canDelete = function () {
        return this.userService.isLoggedIn() &&
            this.userService.getCurrentUserInfo().id === this.citation.user.id;
    };
    CitationComponent.prototype.onLike = function () {
        console.log(this.citation);
        this.citService.likeCitation(this.citation);
    };
    CitationComponent.prototype.onDislike = function () {
        console.log(this.citation);
        this.citService.dislikeCitation(this.citation);
    };
    CitationComponent.prototype.onDelete = function () {
        this.citation.text = "Deleting... Please wait..";
        //TODO service delete, dispatch delete event to remove from list
        this.deleted.emit(this.citation.id);
        this.citService.deleteCitation(this.citation);
    };
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], CitationComponent.prototype, "deleted", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Citation)
    ], CitationComponent.prototype, "citation", void 0);
    CitationComponent = __decorate([
        Component({
            selector: 'app-citation',
            templateUrl: './citation.component.html',
            styleUrls: ['./citation.component.scss']
        }), 
        __metadata('design:paramtypes', [CitationService, UserService])
    ], CitationComponent);
    return CitationComponent;
}());
//# sourceMappingURL=citation.component.js.map