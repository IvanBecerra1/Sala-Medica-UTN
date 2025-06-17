import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHistorialMedicaComponent } from './modal-historial-medica.component';

describe('ModalHistorialMedicaComponent', () => {
  let component: ModalHistorialMedicaComponent;
  let fixture: ComponentFixture<ModalHistorialMedicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalHistorialMedicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHistorialMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
