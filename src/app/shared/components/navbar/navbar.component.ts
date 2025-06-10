import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { NgIf } from '@angular/common';
import { collection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  usuario: any = { rol: 'no-registrado' };
  constructor (private auth : AuthService,
     private router : Router){

  }
  async ngOnInit() {
    this.auth.usuario$.subscribe((usuario) => {
      if (usuario) {
        this.usuario = usuario;
      } else {
        this.usuario = { rol: 'no-registrado' };
      }
    });
  }

  miPerfil(){
    switch (this.usuario.rol){
      case "paciente": this.router.navigateByUrl('paciente/perfil'); break;
      case "admin": this.router.navigateByUrl('admin/perfil'); break;
      case "especialista": this.router.navigateByUrl('especialista/perfil'); break;

    }
  }
  async cerrarSesion() {

    await this.auth.cerrarSesion();
    this.auth.limpiar();
    this.router.navigateByUrl("auth/bienvenida");
  }
}
