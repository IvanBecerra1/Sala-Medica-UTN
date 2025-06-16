import { TestBed } from '@angular/core/testing';

import { EncuestaCalificacionService } from './encuesta-calificacion.service';

describe('EncuestaCalificacionService', () => {
  let service: EncuestaCalificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncuestaCalificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
