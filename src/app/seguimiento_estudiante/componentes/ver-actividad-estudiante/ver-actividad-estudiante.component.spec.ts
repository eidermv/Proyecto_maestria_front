import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerActividadEstudianteComponent } from './ver-actividad-estudiante.component';

describe('VerActividadEstudianteComponent', () => {
  let component: VerActividadEstudianteComponent;
  let fixture: ComponentFixture<VerActividadEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerActividadEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerActividadEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
