import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Ratings} from '../models/ratings';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-citation-rank',
  template: `
<div>
  <button class="rankBlock" md-mini-fab [class.disliked]="isDisliked()" (click)="onDislike()">
    <md-icon class="md-24">remove circle outline</md-icon>
  </button>
  <button  class="rankBlock" md-mini-fab [class.liked]="isLiked()" (click)="onLike()">
    <md-icon class="md-24">add circle outline</md-icon>
  </button>
</div>`,
  styles: [`
.liked
{
  background-color: #00c853;
  color: white;
}

.disliked
{
  background-color: #d1001d;
  color: white;
}

.rankBlock {
  margin-right: 6px;
}
button {
background-color: #ffffff;
color: black;
}`]
})
export class CitationRankComponent {

  @Input() public rank: Ratings = new Ratings();
  @Output() liked = new EventEmitter<number>();
  @Output() disliked = new EventEmitter<number>();

  private voted:boolean = false;

  constructor(public userService:AuthService) {
  }

  onLike()
  {
    this.voted = true;
    this.liked.emit()
  }

  onDislike()
  {
    this.voted = true;
    this.disliked.emit()
  }

  isLiked():boolean
  {
    return this.rank.isLikedBy(AuthService.AUTH_USER.id);
  }

  isDisliked():boolean
  {
    return this.rank.isDislikedBy(AuthService.AUTH_USER.id)
  }


}
