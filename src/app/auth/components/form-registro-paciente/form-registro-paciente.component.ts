import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { ImagenesService } from '../../../core/services/imagenes.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../core/services/toast.service';

import { RecaptchaModule } from "ng-recaptcha"; 
import { ResaltarElementoDirective } from '../../../core/directivas/resaltar-elemento.directive';
@Component({
  selector: 'app-form-registro-paciente',
  imports: [MaterialModule, ResaltarElementoDirective,ReactiveFormsModule, SpinnerComponent, NgIf, 
    RecaptchaModule ],
  templateUrl: './form-registro-paciente.component.html',
  styleUrl: './form-registro-paciente.component.scss'
})
export class FormRegistroPacienteComponent {

  captcha: string | null = null;
  captchaResuelto = false;

  formulario: FormGroup;
  imagen1!: File;
  imagen2!: File;
  cargando = false;
  paso = 1;
  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private usuarioService : UsuarioService,
    private imagenesService : ImagenesService,
    private toastService: ToastService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
      obraSocial: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  resolved(token: string | null) {
    this.captchaResuelto = true;
    console.log('Captcha resuelto:', token);
    this.captcha = token;
  }

  seleccionarImagen1(event: any) {
    this.imagen1 = event.target.files[0];
  }

  seleccionarImagen2(event: any) {
    this.imagen2 = event.target.files[0];
  }
  async registrar() {

    if (this.formulario.invalid || !this.imagen1 || !this.imagen2) {
      this.toastService.mostrarMensaje("Completa todos los campos y subí ambas imagenes", "Registro" ,"error")
      return;
    }
    if (!this.captchaResuelto) {
      this.toastService.mostrarMensaje("Por favor, completa el capcha", "Registro" ,"error")
      return;
    }

    this.cargando = true;
    const { email, password } = this.formulario.value;

    try {
      //const user = await this.authService.registrarUsuario(email, password);
      //await this.authService.enviarVerificacionEmail(user);
      

     /* const sesionAnte = this.authService.obtener();
      if (sesionAnte){
        await this.authService.iniciarSesion(sesionAnte.email, sesionAnte.password);
        console.log("INICIANDO SESION NUEVAMENTE");
        console.log(sesionAnte);
      }*/
     // await  this.authService.cerrarSesion();

      //const { nombre, apellido, edad, dni, obraSocial } = this.formulario.value;
      const { email, password, nombre, apellido, edad, dni, obraSocial } = this.formulario.value;
      const uid = email;

      const imagenUrl = await this.imagenesService.subirImagen(`salaMedica/${uid}_img1.jpg`, this.imagen1);
      const imagen2Url = await this.imagenesService.subirImagen(`salaMedica/${uid}_img2.jpg`, this.imagen2);

      const datos = {
        email,
        password,
        nombre,
        apellido,
        edad,
        dni,
        obraSocial,
        rol: 'paciente', // o el que corresponda
        imagenUrl,
        imagen2Url
      };


     // await this.usuarioService.guardarUsuario(uid, datosPaciente);
      const jsonRecepcion = await this.authService.registrarUsuarioDesdeBackend(datos);
      console.log(jsonRecepcion);

      setTimeout(() => {        
        this.toastService.mostrarMensaje("Inicia sesion para verificar tu correo", "Registro exitoso.", "success");
        this.formulario.reset();
        this.cargando = false;
      }, 3000);

    } catch (error: any) {
      
      this.toastService.mensajeErrorRegistro(error);
      console.error(error.error);
      //alert('Error al registrar: ' + error.message);
      this.cargando = false;
      this.captchaResuelto = false;
    }
  }
}