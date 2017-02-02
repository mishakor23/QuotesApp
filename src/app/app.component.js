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
import { UtilsService } from './services/utils.service';
import { MdSnackBarConfig } from '../../node_modules/@angular/material/snack-bar/snack-bar-config';
import { MdSnackBar } from '../../node_modules/@angular/material/snack-bar/snack-bar';
import { MdDialog } from '../../node_modules/@angular/material/dialog/dialog';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
export var AppComponent = (function () {
    function AppComponent(utilsService, snackBar, dialog) {
        this.utilsService = utilsService;
        this.snackBar = snackBar;
        this.dialog = dialog;
        this.regDialogConfig = {
            disableClose: false,
            width: '60%',
            height: '',
            position: {
                top: '',
                bottom: '',
                left: '',
                right: ''
            }
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.utilsService.onMessage().subscribe(function (msg) {
            _this.showMessageBar(msg);
        });
    };
    AppComponent.prototype.openRegister = function () {
        this.dialog.open(RegisterFormComponent, this.regDialogConfig);
    };
    AppComponent.prototype.showMessageBar = function (msg) {
        var config = new MdSnackBarConfig();
        config.duration = 1500;
        this.snackBar.open(msg, "", config);
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        }), 
        __metadata('design:paramtypes', [UtilsService, MdSnackBar, MdDialog])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map