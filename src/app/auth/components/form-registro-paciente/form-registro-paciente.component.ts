import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { ImagenesService } from '../../../core/services/imagenes.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-form-registro-paciente',
  imports: [MaterialModule, ReactiveFormsModule, SpinnerComponent, NgIf ],
  templateUrl: './form-registro-paciente.component.html',
  styleUrl: './form-registro-paciente.component.scss'
})
export class FormRegistroPacienteComponent {
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
    private dialogRef: MatDialogRef<FormRegistroPacienteComponent>
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      obraSocial: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  seleccionarImagen1(event: any) {
    this.imagen1 = event.target.files[0];
  }

  seleccionarImagen2(event: any) {
    this.imagen2 = event.target.files[0];
  }
  async registrar() {
    if (this.formulario.invalid || !this.imagen1 || !this.imagen2) {
      alert('Completa todos los campos y subí ambas imágenes');
      return;
    }

    this.cargando = true;
    this.dialogRef.disableClose = true;
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

      const imagen1Url = await this.imagenesService.subirImagen(`salaMedica/${uid}_img1.jpg`, this.imagen1);
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
        imagen1Url,
        imagen2Url
      };


     // await this.usuarioService.guardarUsuario(uid, datosPaciente);
      const jsonRecepcion = await this.authService.registrarUsuarioDesdeBackend(datos);
      console.log(jsonRecepcion);
      
      // Esperar 2 segundos antes de mostrar éxito y ocultar spinner
      setTimeout(() => {
        alert('Registro exitoso. Verificá tu correo antes de iniciar sesión.');
        this.formulario.reset();
        this.cargando = false;
        this.dialogRef.disableClose = false;
        this.dialogRef.close();
      }, 3000);

    } catch (error: any) {
      console.error(error);
      alert('Error al registrar: ' + error.message);
      this.cargando = false; // Mantené esto aquí para que el spinner se detenga si hay error
    }
  }
}