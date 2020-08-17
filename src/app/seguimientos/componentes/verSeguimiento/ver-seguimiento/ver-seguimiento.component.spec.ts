import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSeguimientoComponent } from './ver-seguimiento.component';

describe('VerSeguimientoComponent', () => {
  let component: VerSeguimientoComponent;
  let fixture: ComponentFixture<VerSeguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerSeguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
