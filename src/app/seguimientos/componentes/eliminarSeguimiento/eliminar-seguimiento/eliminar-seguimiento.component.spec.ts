import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarSeguimientoComponent } from './eliminar-seguimiento.component';

describe('EliminarSeguimientoComponent', () => {
  let component: EliminarSeguimientoComponent;
  let fixture: ComponentFixture<EliminarSeguimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarSeguimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarSeguimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
