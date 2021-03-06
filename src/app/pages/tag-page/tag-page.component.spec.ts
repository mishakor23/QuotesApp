/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TagPageComponent } from './tag-page.component';

describe('TagPageComponent', () => {
  let component: TagPageComponent;
  let fixture: ComponentFixture<TagPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
