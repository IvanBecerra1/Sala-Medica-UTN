import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ImagenesService } from '../../../core/services/imagenes.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { MaterialModule } from '../../../material.module';
import { UsuarioEspecialista } from '../../../core/models/usuarioEspecialista';
import { NgFor, NgIf } from '@angular/common';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
@Component({
  selector: 'app-form-registro-especialista',
  imports: [MaterialModule, ReactiveFormsModule, NgFor, SpinnerComponent, NgIf],
  templateUrl: './form-registro-especialista.component.html',
  styleUrl: './form-registro-especialista.component.scss'
})
export class FormRegistroEspecialistaComponent {
formulario: FormGroup;
  imagen!: File;
  cargando = false;
  especialidadesDisponibles: string[] = ['Cardiología', 'Pediatría', 'Dermatología'];
  especialidadNueva = new FormControl('');

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
      especialidadesSeleccionadas: [[], Validators.required]
    });
  }

  seleccionarImagen(event: any) {
    this.imagen = event.target.files[0];
  }

  agregarEspecialidadManual() {
    const nueva = this.especialidadNueva.value?.trim();
    if (nueva && !this.especialidadesDisponibles.includes(nueva)) {
      this.especialidadesDisponibles.push(nueva);
      const seleccionadas = this.formulario.value.especialidadesSeleccionadas || [];
      this.formulario.patchValue({
        especialidadesSeleccionadas: [...seleccionadas, nueva]
      });
      this.especialidadNueva.setValue('');
    }
  }

  async registrar() {
    if (this.formulario.invalid || !this.imagen) {
      alert('Completá todos los campos y subí una imagen');
      return;
    }

    this.cargando = true;
    console.log(this.cargando);
    const { email, password, nombre, apellido, edad, dni, especialidadesSeleccionadas } = this.formulario.value;

    try {
      const user = await this.authService.registrarUsuario(email, password);
      await this.authService.enviarVerificacionEmail(user);
      const uid = user.uid;

      const imagenUrl = await this.imagenesService.subirImagen(`usuarios/${uid}_especialista.jpg`, this.imagen);

      const datos : UsuarioEspecialista = {
        uid,
        nombre,
        apellido,
        edad,
        dni,
        email,
        rol: 'especialista',
        aprobado: false,
        especialidades: especialidadesSeleccionadas,
        imagenUrl
      };
      await this.usuarioService.guardarUsuario(uid, datos);

       // Esperar 2 segundos antes de mostrar éxito y ocultar spinner
      setTimeout(() => {
        alert('Registro exitoso. Verificá tu correo y espera aprobación.');
        this.formulario.reset();
        this.cargando = false;
      }, 3000);
    
    } catch (err: any) {
      console.error(err);
      alert('Error al registrar: ' + err.message);
    }
  }
}