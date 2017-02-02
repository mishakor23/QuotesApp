/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CitationListComponent } from './citation-list.component';

describe('CitationListComponent', () => {
  let component: CitationListComponent;
  let fixture: ComponentFixture<CitationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
