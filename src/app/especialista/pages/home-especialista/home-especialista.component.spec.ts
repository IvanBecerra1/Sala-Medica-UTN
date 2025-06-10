import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEspecialistaComponent } from './home-especialista.component';

describe('HomeEspecialistaComponent', () => {
  let component: HomeEspecialistaComponent;
  let fixture: ComponentFixture<HomeEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEspecialistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
