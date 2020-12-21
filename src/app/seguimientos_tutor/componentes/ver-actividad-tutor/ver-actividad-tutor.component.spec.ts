import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerActividadTutorComponent } from './ver-actividad-tutor.component';

describe('VerActividadTutorComponent', () => {
  let component: VerActividadTutorComponent;
  let fixture: ComponentFixture<VerActividadTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerActividadTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerActividadTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
