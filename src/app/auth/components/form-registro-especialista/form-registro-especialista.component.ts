import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ImagenesService } from '../../../core/services/imagenes.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { MaterialModule } from '../../../material.module';
import { UsuarioEspecialista } from '../../../core/models/usuarioEspecialista';
import { NgFor, NgIf } from '@angular/common';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-form-registro-especialista',
  imports: [MaterialModule, ReactiveFormsModule, NgFor, SpinnerComponent, NgIf],
  templateUrl: './form-registro-especialista.component.html',
  styleUrl: './form-registro-especialista.component.scss'
})
export class FormRegistroEspecialistaComponent {
  paso: number = 1;
  formulario: FormGroup;
  imagen!: File;
  cargando = false;
  especialidadesDisponibles: string[] = ['Cardiología', 'Pediatría', 'Dermatología'];
  especialidadNueva = new FormControl('');

  constructor(
    private fb: FormBuilder, private usuarioService : UsuarioService, 
    private authService : AuthService, 
    private imagenesService : ImagenesService,
    private dialogRef: MatDialogRef<FormRegistroEspecialistaComponent>
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
    this.dialogRef.disableClose = true;

    const { email, password, nombre, apellido, edad, dni, especialidadesSeleccionadas } = this.formulario.value;

    try {
      // 1. Subís la imagen al storage y obtenés la URL
      const imagenUrl = await this.imagenesService.subirImagen(`usuarios/${email}_especialista.jpg`, this.imagen);

      // 2. Armás los datos
      const datos = {
        nombre,
        apellido,
        edad,
        dni,
        email,
        password,
        rol: 'especialista',
        especialidades: especialidadesSeleccionadas,
        imagenUrl
      };

      // 3. Hacés la petición al backend para registrar
      const respuesta = await this.authService.registrarEspecialistaDesdeBackend(datos);
      console.log('Registro backend ok:', respuesta);

      setTimeout(() => {
        alert('Registro exitoso. Verificá tu correo y espera aprobación.');
        this.formulario.reset();
        this.cargando = false;
        this.dialogRef.disableClose = false;
        this.dialogRef.close();
      }, 2000);

    } catch (error: any) {
      console.error('Error desde el backend:', error);
      alert('Error al registrar: ' + error.message);
      this.cargando = false;
      this.dialogRef.disableClose = false;
    }
  }
}