import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInternshipForAdminComponent } from './list-internship-for-admin.component';

describe('ListInternshipForAdminComponent', () => {
  let component: ListInternshipForAdminComponent;
  let fixture: ComponentFixture<ListInternshipForAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInternshipForAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInternshipForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
