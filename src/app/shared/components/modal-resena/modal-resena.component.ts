import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../core/services/toast.service';
import { EncuestaCalificacionService } from '../../../core/services/encuesta-calificacion.service';

@Component({
  selector: 'app-modal-resena',
  imports: [MaterialModule, FormsModule, NgFor, NgIf],
  templateUrl: './modal-resena.component.html',
  styleUrl: './modal-resena.component.scss'
})
export class ModalResenaComponent {
 modoVisualizacion: boolean = false;

  altura: string = '';
  peso: string = '';
  temperatura: string = '';
  presion: string = '';
  datosDinamicos: { clave: string; valor: string }[] = [];

  constructor(
    private dialogRef: MatDialogRef<ModalResenaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicio: EncuestaCalificacionService,
    private toast: ToastService
  ) {}

  async ngOnInit() {
    if (this.data?.modo === 'ver') {
      this.modoVisualizacion = true;
      const resena = await this.servicio.obtenerResena(this.data.id);
      this.altura = resena.altura;
      this.peso = resena.peso;
      this.temperatura = resena.temperatura;
      this.presion = resena.presion;
      this.datosDinamicos = resena.dinamicos || [];
    }
  }

  agregarDato() {
    if (this.datosDinamicos.length < 3) {
      this.datosDinamicos.push({ clave: '', valor: '' });
    }
  }

  quitarDato(i: number) {
    this.datosDinamicos.splice(i, 1);
  }

  async guardar() {
    if (!this.altura || !this.peso || !this.temperatura || !this.presion) {
      return this.toast.mostrarMensaje("Todos los datos fijos son obligatorios.", 'Reseña especialista', 'error');
    }

    const datos = {
      altura: this.altura,
      peso: this.peso,
      temperatura: this.temperatura,
      presion: this.presion,
      dinamicos: this.datosDinamicos
    };

    const id = await this.servicio.guardarResena(datos);
    this.dialogRef.close(id);
  }
}