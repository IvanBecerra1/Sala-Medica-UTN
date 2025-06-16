import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMotivoComponent } from './modal-motivo.component';

describe('ModalMotivoComponent', () => {
  let component: ModalMotivoComponent;
  let fixture: ComponentFixture<ModalMotivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMotivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMotivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
