import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarActividadesTutorComponent } from './mostrar-actividades-tutor.component';

describe('MostrarActividadesTutorComponent', () => {
  let component: MostrarActividadesTutorComponent;
  let fixture: ComponentFixture<MostrarActividadesTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarActividadesTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarActividadesTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
