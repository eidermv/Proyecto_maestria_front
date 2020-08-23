import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSeguimientoComponent } from './agregar-seguimiento.component';

describe('AgregarSeguimientoComponent', () => {
  let component: AgregarSeguimientoComponent;
  let fixture: ComponentFixture<AgregarSeguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarSeguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
