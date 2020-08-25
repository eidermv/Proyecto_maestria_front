import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSeguimientoTutorComponent } from './editar-seguimiento-tutor.component';

describe('EditarSeguimientoTutorComponent', () => {
  let component: EditarSeguimientoTutorComponent;
  let fixture: ComponentFixture<EditarSeguimientoTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSeguimientoTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSeguimientoTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
