import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ImagenesService } from '../../../core/services/imagenes.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { MaterialModule } from '../../../material.module';
import { NgFor, NgIf } from '@angular/common';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { UsuarioAdmin } from '../../../core/models/usuarioAdmin';
import { ToastService } from '../../../core/services/toast.service';

import { RecaptchaModule } from "ng-recaptcha";
@Component({
  selector: 'app-form-registro-admin',
  imports: [MaterialModule, ReactiveFormsModule, NgFor, SpinnerComponent,RecaptchaModule, NgIf],
  templateUrl: './form-registro-admin.component.html',
  styleUrl: './form-registro-admin.component.scss'
})
export class FormRegistroAdminComponent {
  paso: number = 1;
  formulario: FormGroup;
  imagen!: File;
  cargando = false;
  
  captcha: string | null = null;
  captchaResuelto = false;
  constructor(
    private fb: FormBuilder, private usuarioService : UsuarioService, 
    private authService : AuthService, private imagenesService : ImagenesService,
    private toastService : ToastService
  ) {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
    });
  }

  resolved(token: string | null) {
    this.captchaResuelto = true;
    console.log('Captcha resuelto:', token);
    this.captcha = token;
  }

  seleccionarImagen(event: any) {
    this.imagen = event.target.files[0];
  }

  async registrar() {
    if (this.formulario.invalid || !this.imagen) {
      this.toastService.mostrarMensaje("Completá todos los campos y subí una imagen", "Registro exitoso.", "error");
      return;
    }
    if (!this.captchaResuelto) {
      this.toastService.mostrarMensaje("Por favor, completa el capcha", "Registro" ,"error")
      return;
    }

    this.cargando = true;
    console.log(this.cargando);
    const { email, password, nombre, apellido, edad, dni } = this.formulario.value;

    try {
      //const user = await this.authService.registrarUsuario(email, password);
      //await this.authService.enviarVerificacionEmail(user);
      const uid = email;

      const imagenUrl = await this.imagenesService.subirImagen(`usuarios/${uid}_especialista.jpg`, this.imagen);

      const datos : any = {
        nombre,
        password,
        apellido,
        edad,
        dni,
        email,
        rol: 'admin',
        imagenUrl
      };

  //    await this.usuarioService.guardarUsuario(uid, datos);
    //  await this.authService.cerrarSesion();
      this.authService.registrarAdminDesdeBackend(datos);
      setTimeout(() => {
        this.toastService.mostrarMensaje("Inicia sesion para verificar tu correo", "Registro exitoso.", "success");
        this.formulario.reset();
        this.cargando = false;
      }, 3000);
    
    } catch (err: any) {
      this.toastService.mensajeErrorRegistro(err);
      console.error(err);
    }
  }
}