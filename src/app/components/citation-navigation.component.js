var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Output } from '@angular/core';
export var CitationNavigationComponent = (function () {
    function CitationNavigationComponent() {
        this.next = new EventEmitter();
        this.prev = new EventEmitter();
    }
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], CitationNavigationComponent.prototype, "next", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], CitationNavigationComponent.prototype, "prev", void 0);
    CitationNavigationComponent = __decorate([
        Component({
            selector: 'app-citation-navigation',
            template: "\n<div fxLayout=\"row\">\n  <button md-raised-button fxFlex=\"50%\" (click)=\"prev.emit($event)\">Previous</button>\n  <button md-raised-button fxFlex=\"50%\" (click)=\"next.emit($event)\">Next</button>\n</div>"
        }), 
        __metadata('design:paramtypes', [])
    ], CitationNavigationComponent);
    return CitationNavigationComponent;
}());
//# sourceMappingURL=citation-navigation.component.js.map