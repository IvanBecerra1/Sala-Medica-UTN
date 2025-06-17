import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { TurnosService } from '../../../core/services/turnos.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { NgFor, NgIf } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { ModalHistorialMedicaComponent } from '../../../shared/components/modal-historial-medica/modal-historial-medica.component';
import { HistorialMedicoService } from '../../../core/services/historial-medico.service';
import { PdfService } from '../../../core/services/pdf.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mis-pacientes',
  imports: [NgFor, NgIf, MaterialModule, FormsModule],
  templateUrl: './mis-pacientes.component.html',
  styleUrl: './mis-pacientes.component.scss'
})
export class MisPacientesComponent implements OnInit {
  pacientes: any[] = [];
  especialista : any;
  uidEspecialista! : string;
  
  constructor(
    private authService : AuthService,
    private turnosService : TurnosService,
    private usuarioService : UsuarioService,
    private historialService : HistorialMedicoService,
    private pdfService : PdfService,
    private dialog : MatDialog
  ){

  }
  async ngOnInit() {
    this.authService.usuario$.subscribe(usuario => {
      if (usuario) {
        this.uidEspecialista = usuario.uid;
        this.especialista = usuario;
        console.log(this.uidEspecialista);

          
        const uidEspecialista : any = this.especialista;
        console.log("ESPECIALISTA ID");
        console.log(uidEspecialista.uid);
        this.turnosService.obtenerTurnosPorEspecialista(uidEspecialista.uid).subscribe(async (turnos) => {
          const realizados = turnos.filter(t => t.estado === 'realizado');
          const uidsUnicos = [...new Set(realizados.map(t => t.pacienteUid))];

          const pacientesPromesas = uidsUnicos.map(uid => this.usuarioService.obtenerUsuario(uid));
          const resultados = await Promise.all(pacientesPromesas);

          this.pacientes = resultados.filter(p => !!p); // filtrar nulos
        });
      
      }
    });

  }

  verHistorial(uid: string) {
    this.dialog.open(ModalHistorialMedicaComponent, {
      data: { uid: uid },
      width: '600px'
    });
  }

  async descargarHistorial(uid: string) {
    const historial = await this.historialService.obtenerHistorialMedico(uid);
    this.pdfService.generarPDF(historial);
  }
}
