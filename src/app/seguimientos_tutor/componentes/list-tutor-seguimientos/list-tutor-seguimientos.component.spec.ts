import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTutorSeguimientosComponent } from './list-tutor-seguimientos.component';

describe('ListTutorSeguimientosComponent', () => {
  let component: ListTutorSeguimientosComponent;
  let fixture: ComponentFixture<ListTutorSeguimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTutorSeguimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTutorSeguimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
