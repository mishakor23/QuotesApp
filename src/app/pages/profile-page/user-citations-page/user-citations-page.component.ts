import { Component, OnInit } from '@angular/core';
import {CitationService} from '../../../services/citation.service';
import {AuthService} from '../../../services/auth.service';
import {Citation} from '../../../models/citation';
import {Observable} from 'rxjs/Observable';
import {CitationData} from '../../../models/citationData';
import {UtilsService} from '../../../services/utils.service';

@Component({
  selector: 'app-user-citations-page',
  templateUrl: './user-citations-page.component.html',
  styleUrls: ['./user-citations-page.component.scss']
})
export class UserCitationsPageComponent implements OnInit {

  citations$:Observable<Citation[]>;

  constructor(private citService:CitationService,
              private userService:AuthService,
              private utilsService:UtilsService) { }

  ngOnInit() {
    this.userService.userStream$.subscribe(user => {
      if(!user) return;
      //console.log("LOADING CITATIONS: "+user.id);
      this.citations$ = this.citService.getUserCitations(user.id);
    });
  }

  addCitation(data:CitationData)
  {
    this.citService.addCitation(data).subscribe((added) => {
      this.utilsService.pushMessage("Citation added successfully");
    });

  }

}
