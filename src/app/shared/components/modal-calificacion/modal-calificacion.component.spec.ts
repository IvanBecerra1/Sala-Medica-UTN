import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCalificacionComponent } from './modal-calificacion.component';

describe('ModalCalificacionComponent', () => {
  let component: ModalCalificacionComponent;
  let fixture: ComponentFixture<ModalCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCalificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
