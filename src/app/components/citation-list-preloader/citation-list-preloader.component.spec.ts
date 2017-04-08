import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitationListPreloaderComponent } from './citation-list-preloader.component';

describe('CitationListPreloaderComponent', () => {
  let component: CitationListPreloaderComponent;
  let fixture: ComponentFixture<CitationListPreloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitationListPreloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitationListPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
