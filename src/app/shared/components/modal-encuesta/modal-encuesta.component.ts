import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { EncuestaCalificacionService } from '../../../core/services/encuesta-calificacion.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal-encuesta',
  imports: [MaterialModule, FormsModule, NgFor, NgIf],
  templateUrl: './modal-encuesta.component.html',
  styleUrl: './modal-encuesta.component.scss'
})
export class ModalEncuestaComponent {
 modoVisualizacion: boolean = false;

  encuesta = {
    ambiente: '',
    comentario: '',
    volveria: ''
  };
  opciones = ['Excelente', 'Bueno', 'Regular', 'Malo'];

  constructor(
    private service: EncuestaCalificacionService,
    private dialogRef: MatDialogRef<ModalEncuestaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit() {
    if (this.data?.modo === 'ver') {
      this.modoVisualizacion = true;
      const enc = await this.service.obtenerEncuesta(this.data.id);
      this.encuesta = enc;
    }
  }

  async confirmar() {
    if (!this.encuesta.ambiente || !this.encuesta.volveria || !this.encuesta.comentario) {
      return;
    }

    const id = await this.service.guardarEncuesta(this.encuesta);
    this.dialogRef.close(id);
  }
}