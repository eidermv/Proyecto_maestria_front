import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarActividadesEstudianteComponent } from './listar-actividades-estudiante.component';

describe('ListarActividadesEstudianteComponent', () => {
  let component: ListarActividadesEstudianteComponent;
  let fixture: ComponentFixture<ListarActividadesEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarActividadesEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarActividadesEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
