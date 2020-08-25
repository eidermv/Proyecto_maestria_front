import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesTutorComponent } from './notificaciones-tutor.component';

describe('NotificacionesTutorComponent', () => {
  let component: NotificacionesTutorComponent;
  let fixture: ComponentFixture<NotificacionesTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionesTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
