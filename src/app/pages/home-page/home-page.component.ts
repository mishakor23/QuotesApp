import { Component, OnInit } from '@angular/core';
import {CitationService} from '../../services/citation.service';
import {Observable} from 'rxjs';
import {Citation} from '../../models/citation';
import {UtilsService} from '../../services/utils.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  citation:Citation;

  citations$:Observable<Citation[]>;

  constructor(public citService:CitationService, public userService:AuthService, public utilsService:UtilsService) {

  }

  ngOnInit() {
    this.citations$ = this.citService.getAllCitations();
  }

}
