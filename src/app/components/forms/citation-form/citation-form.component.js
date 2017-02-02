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
import { FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from '../../../services/utils.service';
import { UserService } from '../../../services/user.service';
import { CitationService } from '../../../services/citation.service';
import { CitationData } from '../../../models/citationData';
import { Output, EventEmitter } from '@angular/core';
export var CitationFormComponent = (function () {
    function CitationFormComponent(fb, utilsService, userService, citService) {
        this.fb = fb;
        this.utilsService = utilsService;
        this.userService = userService;
        this.citService = citService;
        this.valueChanged = new EventEmitter();
        this.submitted = new EventEmitter();
        this.maxTextLength = 300;
        this.minTextLength = 6;
        this.maxAuthorLength = 50;
        this.authorHint = "Author name";
        this.isFloating = false;
        this.textError = "";
        this.authorError = "";
    }
    CitationFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            text: ["", Validators.compose([Validators.required, Validators.minLength(this.minTextLength), Validators.maxLength(this.maxTextLength)])],
            author: ["", Validators.maxLength(50)],
            iAmAuthor: false,
            tagInput: []
        });
        var textStream$ = this.form.controls["text"].valueChanges;
        var authorStream$ = this.form.controls["author"].valueChanges;
        textStream$.subscribe(function (data) {
            _this.textErrors(data);
        });
        authorStream$.subscribe(function (data) {
            _this.authorErrors(data);
        });
        this.form.valueChanges.subscribe(function () {
            _this.formValueChanged();
        });
    };
    CitationFormComponent.prototype.formValueChanged = function () {
        this.valueChanged.emit(this.getCurValue());
    };
    CitationFormComponent.prototype.onSubmit = function () {
        if (this.isValid()) {
            this.submitted.emit(this.getCurValue());
        }
        else {
            this.onError("Form validation failed");
        }
    };
    CitationFormComponent.prototype.toggleAuthor = function () {
        var ctrl = this.form.get('author');
        if (ctrl.enabled) {
            ctrl.setValue("");
            this.isFloating = false;
        }
        ctrl.enabled ? ctrl.disable() : ctrl.enable();
        ctrl.enabled ? this.authorHint = "Author name" : this.authorHint = "Parez";
        this.authorErrors(ctrl.value);
    };
    CitationFormComponent.prototype.authorErrors = function (value) {
        if (value === null)
            return;
        var isSelf = this.form.controls["iAmAuthor"].value;
        if (!isSelf && value === '') {
            this.authorError = 'Author is required. Check the box if you are the author.';
        }
        else if (value.length > this.maxAuthorLength) {
            this.authorError = 'Author name is too long.';
        }
        else {
            this.authorError = '';
        }
    };
    CitationFormComponent.prototype.onError = function (msg) {
        this.utilsService.pushMessage(msg);
    };
    CitationFormComponent.prototype.isValid = function () {
        var isSelf = this.form.controls["iAmAuthor"].value;
        var authorVal = this.form.controls["author"].value;
        var isAuthorValid = isSelf || (authorVal.length > 0);
        return this.form.valid && isAuthorValid;
    };
    CitationFormComponent.prototype.getCurValue = function () {
        var text = this.form.get("text").value;
        var authorText = this.form.get("author").value;
        var author = !this.form.get("iAmAuthor").value ? authorText : this.userService.getCurrentUserInfo().username;
        var tags = this.form.get("tagInput").value;
        return new CitationData(text, author, tags);
    };
    CitationFormComponent.prototype.textErrors = function (value) {
        if (value === '') {
            this.textError = 'Text is required';
        }
        else if (value.length < this.minTextLength) {
            this.textError = 'Text is too short';
        }
        else if (value.length > this.maxTextLength) {
            this.textError = "Text is too long. " + this.maxTextLength + " symbols maximum)";
        }
        else {
            this.textError = "";
        }
    };
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], CitationFormComponent.prototype, "valueChanged", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], CitationFormComponent.prototype, "submitted", void 0);
    CitationFormComponent = __decorate([
        Component({
            selector: 'app-citation-form',
            templateUrl: './citation-form.component.html',
            styleUrls: ['./citation-form.component.scss']
        }), 
        __metadata('design:paramtypes', [FormBuilder, UtilsService, UserService, CitationService])
    ], CitationFormComponent);
    return CitationFormComponent;
}());
//# sourceMappingURL=citation-form.component.js.map