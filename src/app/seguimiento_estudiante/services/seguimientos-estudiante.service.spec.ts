/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeguimientosEstudianteService } from './seguimientos-estudiante.service';

describe('Service: SeguimientosEstudiante', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeguimientosEstudianteService]
    });
  });

  it('should ...', inject([SeguimientosEstudianteService], (service: SeguimientosEstudianteService) => {
    expect(service).toBeTruthy();
  }));
});
