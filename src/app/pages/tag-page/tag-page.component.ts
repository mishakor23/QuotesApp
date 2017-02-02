import { Component, OnInit } from '@angular/core';
import {CitationService} from '../../services/citation.service';
import {Observable} from '../../../../node_modules/rxjs/Observable';
import {Citation} from '../../models/citation';
import {ActivatedRoute} from '@angular/router/src/router_state';
import {Subscription} from 'rxjs/Subscription';
import {Params} from '../../../../node_modules/@angular/router/src/shared';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss']
})
export class TagPageComponent implements OnInit {
  citations$:Observable<Citation[]>;

  private tag:string = "";
  private sub;

  constructor(private citService:CitationService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.tag = params["id"];
      this.citations$ = this.citService.getCitationsByTag(this.tag);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
