import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-modal',
  imports: [MaterialModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  mensaje: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { titulo: string, nombre: string }
  ) {}

  cerrar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    if (this.mensaje.trim()) {
      this.dialogRef.close(this.mensaje);
    }
  }
}