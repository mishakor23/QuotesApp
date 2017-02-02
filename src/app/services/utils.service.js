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
import { Observable, Subject } from 'rxjs';
export var UtilsService = (function () {
    function UtilsService() {
        this.messages$ = new Subject();
    }
    UtilsService.prototype.onMessage = function () {
        return this.messages$;
    };
    UtilsService.prototype.pushMessage = function (msg) {
        this.messages$.next(msg);
    };
    UtilsService.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    };
    UtilsService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], UtilsService);
    return UtilsService;
}());
//# sourceMappingURL=utils.service.js.map