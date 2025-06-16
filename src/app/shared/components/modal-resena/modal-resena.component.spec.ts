import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResenaComponent } from './modal-resena.component';

describe('ModalResenaComponent', () => {
  let component: ModalResenaComponent;
  let fixture: ComponentFixture<ModalResenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalResenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
