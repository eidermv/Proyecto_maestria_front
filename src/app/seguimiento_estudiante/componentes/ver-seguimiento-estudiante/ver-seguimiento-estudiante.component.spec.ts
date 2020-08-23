import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSeguimientoEstudianteComponent } from './ver-seguimiento-estudiante.component';

describe('VerSeguimientoEstudianteComponent', () => {
  let component: VerSeguimientoEstudianteComponent;
  let fixture: ComponentFixture<VerSeguimientoEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerSeguimientoEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSeguimientoEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
