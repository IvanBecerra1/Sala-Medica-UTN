import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-modal-motivo',
  imports: [MaterialModule],
  templateUrl: './modal-motivo.component.html',
  styleUrl: './modal-motivo.component.scss'
})
export class ModalMotivoComponent {
  nombre: string = '';
  apellido: string = '';
  rol: string = '';
  mensaje: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalMotivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { comentario: string }
  ) {
    const partes = data.comentario.split('@');
    if (partes.length === 4) {
      [this.nombre, this.apellido, this.rol, this.mensaje] = partes;
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}