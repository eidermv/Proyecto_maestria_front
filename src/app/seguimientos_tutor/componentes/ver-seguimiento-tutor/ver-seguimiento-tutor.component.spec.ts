import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerSeguimientoTutorComponent } from './ver-seguimiento-tutor.component';

describe('VerSeguimientoTutorComponent', () => {
  let component: VerSeguimientoTutorComponent;
  let fixture: ComponentFixture<VerSeguimientoTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerSeguimientoTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerSeguimientoTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
