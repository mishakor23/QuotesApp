var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ratings } from '../models/ratings';
import { UserService } from '../services/user.service';
export var CitationRankComponent = (function () {
    function CitationRankComponent(userService) {
        this.userService = userService;
        this.rank = new Ratings();
        this.liked = new EventEmitter();
        this.disliked = new EventEmitter();
        this.voted = false;
    }
    CitationRankComponent.prototype.onLike = function () {
        this.voted = true;
        this.liked.emit();
    };
    CitationRankComponent.prototype.onDislike = function () {
        this.voted = true;
        this.disliked.emit();
    };
    CitationRankComponent.prototype.isLiked = function () {
        return this.rank.isLikedBy(this.userService.userId);
    };
    CitationRankComponent.prototype.isDisliked = function () {
        return this.rank.isDislikedBy(this.userService.userId);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Ratings)
    ], CitationRankComponent.prototype, "rank", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], CitationRankComponent.prototype, "liked", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], CitationRankComponent.prototype, "disliked", void 0);
    CitationRankComponent = __decorate([
        Component({
            selector: 'app-citation-rank',
            template: "\n<div>\n  <button class=\"rankBlock\" md-mini-fab [class.disliked]=\"isDisliked()\" (click)=\"onDislike()\">\n    <md-icon class=\"md-24\">remove circle outline</md-icon>\n  </button>\n  <button  class=\"rankBlock\" md-mini-fab [class.liked]=\"isLiked()\" (click)=\"onLike()\">\n    <md-icon class=\"md-24\">add circle outline</md-icon>\n  </button>\n</div>",
            styles: ["\n.liked\n{\n  background-color: #00c853;\n}\n\n.disliked\n{\n  background-color: #d1001d;\n}\n\n.rankBlock {\n  margin-right: 6px;\n}\nbutton {\nbackground-color: #ffffff;\n}"]
        }), 
        __metadata('design:paramtypes', [UserService])
    ], CitationRankComponent);
    return CitationRankComponent;
}());
//# sourceMappingURL=citation-rank.component.js.map