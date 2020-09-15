import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarActividadTutorComponent } from './editar-actividad-tutor.component';

describe('EditarActividadTutorComponent', () => {
  let component: EditarActividadTutorComponent;
  let fixture: ComponentFixture<EditarActividadTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarActividadTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarActividadTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
