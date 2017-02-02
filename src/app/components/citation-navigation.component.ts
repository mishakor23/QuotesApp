import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-citation-navigation',
  template: `
<div fxLayout="row">
  <button md-raised-button fxFlex="50%" (click)="prev.emit($event)">Previous</button>
  <button md-raised-button fxFlex="50%" (click)="next.emit($event)">Next</button>
</div>`
})
export class CitationNavigationComponent {

  @Output() next: EventEmitter<any> = new EventEmitter();
  @Output() prev: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
