import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { TurnosService } from '../../../core/services/turnos.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { HistorialMedicoService } from '../../../core/services/historial-medico.service';
import { PdfService } from '../../../core/services/pdf.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalHistorialMedicaComponent } from '../../../shared/components/modal-historial-medica/modal-historial-medica.component';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-todo-usuarios',
  imports: [MaterialModule, FormsModule, NgIf, NgFor],
  templateUrl: './todo-usuarios.component.html',
  styleUrl: './todo-usuarios.component.scss'
})
export class TodoUsuariosComponent implements OnInit{

  pacientes: any[] = [];
  especialista : any;
  uidEspecialista! : string;
  
  constructor(
    private authService : AuthService,
    private turnosService : TurnosService,
    private usuarioService : UsuarioService,
    private historialService : HistorialMedicoService,
    private pdfService : PdfService,
    private dialog : MatDialog,
    private toast : ToastService
  ){

  }
  async ngOnInit() {
    this.usuarioService.obtenerTodosLosUsuarios().subscribe(async (usuarios) => {
      this.pacientes = usuarios;
    });
  }

  async verHistorial(uid: string, rol: string) {
    if (rol !== 'paciente') {
      this.toast.mostrarMensaje('Este usuario es un especialista y no tiene historia clínica', 'Historial', 'info');
      return;
    }

    const historial = await this.historialService.obtenerHistorialMedico(uid);
    if (!historial || historial.length === 0) {
      this.toast.mostrarMensaje('Este paciente aún no tiene historia clínica registrada.', 'Historial', 'info');
      return;
    }

    this.dialog.open(ModalHistorialMedicaComponent, {
      data: { historial, uid },
      width: '600px'
    });
  }


  async descargarHistorial(uid: string) {
    const historial = await this.historialService.obtenerHistorialMedico(uid);
    this.pdfService.generarPDF(historial);
  }
}
