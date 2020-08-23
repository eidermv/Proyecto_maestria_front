import { TestBed } from '@angular/core/testing';

import { PermisoTutorGuard } from './permiso-tutor.guard';

describe('PermisoTutorGuard', () => {
  let guard: PermisoTutorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermisoTutorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
