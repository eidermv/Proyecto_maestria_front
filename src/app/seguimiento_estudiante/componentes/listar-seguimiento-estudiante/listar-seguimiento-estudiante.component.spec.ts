import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSeguimientoEstudianteComponent } from './listar-seguimiento-estudiante.component';

describe('ListarSeguimientoEstudianteComponent', () => {
  let component: ListarSeguimientoEstudianteComponent;
  let fixture: ComponentFixture<ListarSeguimientoEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarSeguimientoEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSeguimientoEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
