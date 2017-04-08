import {Component, OnInit, forwardRef, Input} from '@angular/core';
import {FormGroup, FormBuilder, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
  providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TagInputComponent),
        multi: true
      }
    ]
})
export class TagInputComponent implements OnInit, ControlValueAccessor {

  @Input() maxTags:number = 5;

  form: FormGroup;
  tags:string[] = [];
  private onChangeFn = (_: any) => {};


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      tagInput: ""
    });
  }

  writeValue(obj: any): void {
    if (obj !== undefined)
    {
      this.tags.concat(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
  }

  onTagType(event:KeyboardEvent):void
  {
    let input = this.form.get("tagInput");
    let strVal = input.value.replace(/\s/g, '');
    if((event.key === " " || event.keyCode == 13) && strVal.length > 0)
    {
      input.setValue("");
      if(this.tags.length < this.maxTags) {
        this.tags.push(strVal);
        this.onChangeFn(this.tags);
        if(this.tags.length == this.maxTags)
        {
          this.form.controls["tagInput"].disable();
        }
      }
      else {
        //Emit error
      }
    }
  }

  removeTag(index:number):void
  {
    //console.log(index);
    this.tags.splice(index, 1).toString();
    this.onChangeFn(this.tags);
    if(this.tags.length < this.maxTags)
    {
      this.form.controls["tagInput"].enable();
    }
  }

}
