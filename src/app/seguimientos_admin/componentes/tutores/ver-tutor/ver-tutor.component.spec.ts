/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerTutorComponent } from './ver-tutor.component';

describe('VerTutorComponent', () => {
  let component: VerTutorComponent;
  let fixture: ComponentFixture<VerTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
