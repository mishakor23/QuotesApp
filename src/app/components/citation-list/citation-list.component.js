var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
export var CitationListComponent = (function () {
    function CitationListComponent() {
        this._citations = [];
    }
    Object.defineProperty(CitationListComponent.prototype, "citations", {
        set: function (val) {
            console.log("Citations now:");
            console.log(val);
            this._citations = val;
        },
        enumerable: true,
        configurable: true
    });
    CitationListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], CitationListComponent.prototype, "citations", null);
    CitationListComponent = __decorate([
        Component({
            selector: 'app-citation-list',
            templateUrl: './citation-list.component.html',
            styleUrls: ['./citation-list.component.scss']
        }), 
        __metadata('design:paramtypes', [])
    ], CitationListComponent);
    return CitationListComponent;
}());
//# sourceMappingURL=citation-list.component.js.map