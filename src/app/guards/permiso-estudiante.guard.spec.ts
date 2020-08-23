import { TestBed } from '@angular/core/testing';

import { PermisoEstudianteGuard } from './permiso-estudiante.guard';

describe('PermisoEstudianteGuard', () => {
  let guard: PermisoEstudianteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermisoEstudianteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
