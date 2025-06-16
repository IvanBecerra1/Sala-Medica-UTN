import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { EncuestaCalificacionService } from '../../../core/services/encuesta-calificacion.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal-calificacion',
  imports: [MaterialModule, FormsModule, NgFor, NgIf],
  templateUrl: './modal-calificacion.component.html',
  styleUrl: './modal-calificacion.component.scss'
})
export class ModalCalificacionComponent {
 modoVisualizacion = false;

  calificacion = {
    puntaje: 5,
    comentario: '',
    demora: '',
    recomendado: ''
  };

  constructor(
    private service: EncuestaCalificacionService,
    private dialogRef: MatDialogRef<ModalCalificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    if (this.data?.modo === 'ver') {
      this.modoVisualizacion = true;
      const cal = await this.service.obtenerCalificacion(this.data.id);
      this.calificacion = cal;
    }
  }

  async confirmar() {
    if (!this.calificacion.puntaje || !this.calificacion.comentario || !this.calificacion.demora || !this.calificacion.recomendado) {
      return;
    }

    const id = await this.service.guardarCalificacion(this.calificacion);
    this.dialogRef.close(id);
  }
}