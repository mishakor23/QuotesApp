import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilsService} from '../../../services/utils.service';
import {AuthService} from '../../../services/auth.service';
import {CitationService} from '../../../services/citation.service';
import {CitationData} from '../../../models/citationData';
import {Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-citation-form',
  templateUrl: './citation-form.component.html',
  styleUrls: ['./citation-form.component.scss']
})
export class CitationFormComponent implements OnInit {

  @Output() valueChanged:EventEmitter<CitationData> = new EventEmitter<CitationData>();
  @Output() submitted:EventEmitter<CitationData> = new EventEmitter<CitationData>();

  maxTextLength:number = 300;
  minTextLength:number = 6;
  maxAuthorLength: number = 50;

  form: FormGroup;
  authorHint:string = "Author name";
  isFloating:boolean = false;

  textError:string = "";
  authorError:string = "";

  constructor(private fb: FormBuilder,
              private utilsService:UtilsService,
              private userService:AuthService) { }

  ngOnInit() {
    this.form = this.fb.group({
      text: ["", Validators.compose([Validators.required, Validators.minLength(this.minTextLength), Validators.maxLength(this.maxTextLength)]) ],
      author: ["", Validators.maxLength(50)],
      iAmAuthor: false,
      tagInput: []
    });

    let textStream$ = this.form.controls["text"].valueChanges;
    let authorStream$ = this.form.controls["author"].valueChanges;

    textStream$.subscribe( (data) => {
      this.textErrors(data);
    });
    authorStream$.subscribe( (data) => {
      this.authorErrors(data);
    });

    this.form.valueChanges.subscribe( () => {
      this.formValueChanged();
    })
  }

  formValueChanged()
  {
    this.valueChanged.emit(this.getCurValue());
  }

  onSubmit()
  {
    if(this.isValid())
    {
      //console.log("Submit ADD CITATION form");
      this.submitted.emit(this.getCurValue());
    }
    else {
      this.onError("Form validation failed");
    }
  }

  toggleAuthor() : void {
    let ctrl = this.form.get('author');
    if(ctrl.enabled)
    {
      ctrl.setValue("");
      this.isFloating = false;
    }

    ctrl.enabled ? ctrl.disable() : ctrl.enable();
    ctrl.enabled ? this.authorHint="Author name" : this.authorHint=AuthService.AUTH_USER.username;
    this.authorErrors(ctrl.value);
  }


  authorErrors(value) {
    if(value === null) return;
    let isSelf:boolean = this.form.controls["iAmAuthor"].value;

    if(!isSelf && value === '')
    {
      this.authorError = 'Author is required. Check the box if you are the author.';
    }
    else if(value.length > this.maxAuthorLength){
      this.authorError = 'Author name is too long.';
    }
    else {
      this.authorError = '';
    }
  }

  onError(msg:string) {
    this.utilsService.pushMessage(msg);
  }

  private isValid():boolean
  {
    let isSelf:boolean = this.form.controls["iAmAuthor"].value;
    let authorVal:string = this.form.controls["author"].value;
    let isAuthorValid = isSelf || (authorVal.length > 0);
    return this.form.valid && isAuthorValid;
  }

  private getCurValue():CitationData
  {
    let text:string = this.form.get("text").value;
    let authorText:string = this.form.get("author").value;
    let author:string = !this.form.get("iAmAuthor").value?authorText:AuthService.AUTH_USER.username;
    let tags:string[] = this.form.get("tagInput").value;
    return new CitationData(text, author, tags);
  }

  textErrors(value) {
    if (value === '') {
      this.textError = 'Text is required';
    } else if (value.length < this.minTextLength) {
      this.textError = 'Text is too short';
    } else if(value.length > this.maxTextLength){
      this.textError = `Text is too long. ${this.maxTextLength} symbols maximum)`;
    }
    else {
      this.textError = "";
    }
  }
}
