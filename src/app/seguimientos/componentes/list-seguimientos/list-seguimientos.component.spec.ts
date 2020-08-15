import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSeguimientosComponent } from './list-seguimientos.component';

describe('ListSeguimientosComponent', () => {
  let component: ListSeguimientosComponent;
  let fixture: ComponentFixture<ListSeguimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSeguimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSeguimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
