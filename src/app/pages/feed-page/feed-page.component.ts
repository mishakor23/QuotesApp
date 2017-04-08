import { Component, OnInit } from '@angular/core';
import {Citation} from '../../models/citation';
import {Observable} from '../../../../node_modules/rxjs/Observable';
import {CitationService} from '../../services/citation.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.scss']
})
export class FeedPageComponent implements OnInit {

  citation:Citation;

  citations$:Observable<Citation[]>;

  constructor(public citService:CitationService, public userService:AuthService) {

  }

  ngOnInit() {
    this.citations$ = this.citService.getFeed();
  }


}
