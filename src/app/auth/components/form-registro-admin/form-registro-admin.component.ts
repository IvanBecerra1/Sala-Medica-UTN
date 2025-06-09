import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ImagenesService } from '../../../core/services/imagenes.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { MaterialModule } from '../../../material.module';
import { NgFor, NgIf } from '@angular/common';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { UsuarioAdmin } from '../../../core/models/usuarioAdmin';
@Component({
  selector: 'app-form-registro-admin',
  imports: [MaterialModule, ReactiveFormsModule, NgFor, SpinnerComponent, NgIf],
  templateUrl: './form-registro-admin.component.html',
  styleUrl: './form-registro-admin.component.scss'
})
export class FormRegistroAdminComponent {
  paso: number = 1;
  formulario: FormGroup;
  imagen!: File;
  cargando = false;
  constructor(
    private fb: FormBuilder, private usuarioService : UsuarioService, 
    private authService : AuthService, private imagenesService : ImagenesService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  seleccionarImagen(event: any) {
    this.imagen = event.target.files[0];
  }

  async registrar() {
    if (this.formulario.invalid || !this.imagen) {
      alert('Completá todos los campos y subí una imagen');
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
       // Esperar 2 segundos antes de mostrar éxito y ocultar spinner
      setTimeout(() => {
        alert('Registro exitoso. Se envio correo de verificacion.');
        this.formulario.reset();
        this.cargando = false;
      }, 3000);
    
    } catch (err: any) {
      console.error(err);
      alert('Error al registrar: ' + err.message);
    }
  }
}