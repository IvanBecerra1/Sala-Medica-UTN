import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfService } from '../../../core/services/pdf.service';
import { HistorialMedicoService } from '../../../core/services/historial-medico.service';
import { ModalHistorialMedicaComponent } from '../../../shared/components/modal-historial-medica/modal-historial-medica.component';
import { MatDialog } from '@angular/material/dialog';
import { TurnosService } from '../../../core/services/turnos.service';
import { firstValueFrom } from 'rxjs';
import { ResaltarElementoDirective } from '../../../core/directivas/resaltar-elemento.directive';
import { FormatearDniPipe } from '../../../core/pipes/formatear-dni.pipe';

@Component({
  selector: 'app-mi-perfil-paciente',
  imports: [MaterialModule, NgIf, NgFor,FormsModule, TitleCasePipe,FormatearDniPipe, ResaltarElementoDirective],
  templateUrl: './mi-perfil-paciente.component.html',
  styleUrl: './mi-perfil-paciente.component.scss'
})
export class MiPerfilPacienteComponent implements OnInit {
  usuario: any;
  turnos: any[] = [];
  especialistasUnicos: any[] = [];
  constructor(private auth: AuthService,
    private historialMedica : HistorialMedicoService,
    private dialog: MatDialog, private pdf : PdfService,
    private usuarioService: UsuarioService,
    private turnoService : TurnosService) {}

  async ngOnInit() {
    const currentUser = await this.auth.obtenerSesion();
    if (currentUser) {
      this.usuario = await this.usuarioService.obtenerUsuario(currentUser.uid);
      console.log(this.usuario);

      console.log('turnos:');
      const turnos = await this.historialMedica.obtenerHistorialMedico(this.usuario.uid);
      if (turnos.length>0) {
        this.turnos = turnos;
        console.log(turnos);
        this.turnos = turnos;

        const clave = (t: any) => `${t.nombreEsp}|${t.apellidoEsp}`;
        const mapa = new Map();

        for (const turno of turnos) {
          const k = clave(turno);
          if (!mapa.has(k)) mapa.set(k, turno);
        }
        this.especialistasUnicos = Array.from(mapa.values());
      }
      else 
        console.log('no hay turnos');
    }



  }

  descargarHistorialPorEspecialista(especialista: any) {
    const historialFiltrado = this.turnos.filter(turno =>
      turno.nombreEsp === especialista.nombreEsp &&
      turno.apellidoEsp === especialista.apellidoEsp
    );

    this.pdf.generarPDF(historialFiltrado);
  }

  async generarPDF(){
  //  console.log("df");
  //  const data :any = await this.historialMedica.obtenerHistorialMedico(this.usuario.uid);
  //  console.log("datos medicos");
  //  console.log(data);
  //  this.pdf.generarPDF(data);
  this.dialog.open(ModalHistorialMedicaComponent, {
    data: { uid: this.usuario.uid },
    width: '600px'
    });
  }
}