import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestImagenComponent } from './test-imagen.component';

describe('TestImagenComponent', () => {
  let component: TestImagenComponent;
  let fixture: ComponentFixture<TestImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestImagenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
