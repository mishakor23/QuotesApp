import {Component, OnInit, Input} from '@angular/core';
import {Citation} from '../../models/citation';

@Component({
  selector: 'app-citation-list',
  templateUrl: './citation-list.component.html',
  styleUrls: ['./citation-list.component.scss']
})
export class CitationListComponent implements OnInit {

  _citations:Citation[] = [];
  @Input() set citations(val:Citation[]){
    //console.log("Citations now:");
    //console.log(val);
    this._citations = val;
  }

  constructor() { }

  ngOnInit() {

  }

}
