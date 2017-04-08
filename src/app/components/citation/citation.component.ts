import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {Citation} from '../../models/citation';
import {CitationService} from '../../services/citation.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-citation',
  templateUrl: './citation.component.html',
  styleUrls: ['./citation.component.scss']
})
export class CitationComponent implements OnInit {

  @Output() deleted = new EventEmitter<string>();
  @Input() citation: Citation;

  constructor(private citService:CitationService, private authService:AuthService) {
    this.citation = new Citation();
  }

  ngOnInit(): void {
    //this.citation = new Citation();
  }

  canRate()
  {
    return this.authService.isLoggedIn();
  }

  canDelete()
  {
    return this.authService.isLoggedIn()
      && AuthService.AUTH_USER
      && AuthService.AUTH_USER.id === this.citation.user.id;
  }

  onLike(){
    console.log(this.citation);
    this.citService.likeCitation(this.citation);
  }

  onDislike(){
    console.log(this.citation);
    this.citService.dislikeCitation(this.citation);
  }

  onDelete() {
    this.citation.text = "Deleting... Please wait..";
    //TODO service delete, dispatch delete event to remove from list
    this.deleted.emit(this.citation.id);
    this.citService.deleteCitation(this.citation);
  }

}
