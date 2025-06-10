import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPerfilEspecialistaComponent } from './mi-perfil-especialista.component';

describe('MiPerfilEspecialistaComponent', () => {
  let component: MiPerfilEspecialistaComponent;
  let fixture: ComponentFixture<MiPerfilEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiPerfilEspecialistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiPerfilEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
