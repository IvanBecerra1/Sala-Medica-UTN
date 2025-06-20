import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEncuestaComponent } from './modal-encuesta.component';

describe('ModalEncuestaComponent', () => {
  let component: ModalEncuestaComponent;
  let fixture: ComponentFixture<ModalEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEncuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
