import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActividadesTutorComponent } from './list-actividades-tutor.component';

describe('ListActividadesTutorComponent', () => {
  let component: ListActividadesTutorComponent;
  let fixture: ComponentFixture<ListActividadesTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActividadesTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActividadesTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
