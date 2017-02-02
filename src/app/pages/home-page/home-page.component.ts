import { Component, OnInit } from '@angular/core';
import {CitationService} from '../../services/citation.service';
import {Observable} from 'rxjs';
import {Citation} from '../../models/citation';
import {MdDialog} from '../../../../node_modules/@angular/material/dialog/dialog';
import {MdDialogConfig} from '../../../../node_modules/@angular/material/dialog/dialog-config';
import {CitationFormComponent} from '../../components/forms/citation-form/citation-form.component';
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

  constructor(public citService:CitationService, private utilsService:UtilsService, public userService:AuthService) {

  }

  ngOnInit() {
    this.citations$ = this.citService.getAllCitations();
  }

}
