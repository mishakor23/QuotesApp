import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {Citation} from '../../models/citation';

@Component({
  selector: 'app-citation-list-preloader',
  templateUrl: './citation-list-preloader.component.html',
  styleUrls: ['./citation-list-preloader.component.scss']
})
export class CitationListPreloaderComponent implements OnInit {

  @Input() citations$:Observable<Citation[]> = Observable.of(null);

  constructor() { }

  ngOnInit() {
  }

}
