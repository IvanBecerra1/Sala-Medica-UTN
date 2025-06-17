import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HistorialMedicoService } from '../../../core/services/historial-medico.service';
import { PdfService } from '../../../core/services/pdf.service';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal-historial-medica',
  imports: [MaterialModule, FormsModule, NgIf, NgFor],
  templateUrl: './modal-historial-medica.component.html',
  styleUrl: './modal-historial-medica.component.scss'
})
export class ModalHistorialMedicaComponent {
  historial: any[] = [];
  cargando = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { uid: string },
    private dialogRef: MatDialogRef<ModalHistorialMedicaComponent>,
    private historialService: HistorialMedicoService,
    private pdfService: PdfService
  ) {}

  async ngOnInit() {
    this.historial = await this.historialService.obtenerHistorialMedico(this.data.uid);
    this.cargando = false;
  }

  descargarPDF() {
    this.pdfService.generarPDF(this.historial);
  }
}