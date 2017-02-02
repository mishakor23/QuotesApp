var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
export var TagInputComponent = (function () {
    function TagInputComponent(fb) {
        this.fb = fb;
        this.maxTags = 5;
        this.tags = [];
        this.onChangeFn = function (_) { };
    }
    TagInputComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            tagInput: ""
        });
    };
    TagInputComponent.prototype.writeValue = function (obj) {
        if (obj !== undefined) {
            this.tags.concat(obj);
        }
    };
    TagInputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeFn = fn;
    };
    TagInputComponent.prototype.registerOnTouched = function (fn) {
    };
    TagInputComponent.prototype.onTagType = function (event) {
        var input = this.form.get("tagInput");
        var strVal = input.value.replace(/\s/g, '');
        if ((event.key === " " || event.keyCode == 13) && strVal.length > 0) {
            input.setValue("");
            if (this.tags.length < this.maxTags) {
                this.tags.push(strVal);
                this.onChangeFn(this.tags);
                if (this.tags.length == this.maxTags) {
                    this.form.controls["tagInput"].disable();
                }
            }
            else {
            }
        }
    };
    TagInputComponent.prototype.removeTag = function (index) {
        console.log(index);
        this.tags.splice(index, 1).toString();
        this.onChangeFn(this.tags);
        if (this.tags.length < this.maxTags) {
            this.form.controls["tagInput"].enable();
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], TagInputComponent.prototype, "maxTags", void 0);
    TagInputComponent = __decorate([
        Component({
            selector: 'app-tag-input',
            templateUrl: './tag-input.component.html',
            styleUrls: ['./tag-input.component.scss'],
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return TagInputComponent; }),
                    multi: true
                }
            ]
        }), 
        __metadata('design:paramtypes', [FormBuilder])
    ], TagInputComponent);
    return TagInputComponent;
}());
//# sourceMappingURL=tag-input.component.js.map