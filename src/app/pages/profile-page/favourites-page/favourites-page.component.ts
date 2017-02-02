import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CitationService} from '../../../services/citation.service';
import {Citation} from '../../../models/citation';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.scss']
})
export class FavouritesPageComponent implements OnInit {

  citations$:Observable<Citation[]>;

  constructor(private citService:CitationService, private userService:AuthService) { }

  ngOnInit() {
    this.userService.userStream$.subscribe(user => {
      //console.log("LOADING CITATIONS: "+user.id);
      this.citations$ = this.citService.getUserFavourites(user.id);
      this.citations$.subscribe((cits) => {
        //console.log("Got citations");
        //console.log(cits);
      })
    });
  }

}
