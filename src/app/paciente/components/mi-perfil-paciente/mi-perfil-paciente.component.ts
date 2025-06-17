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

@Component({
  selector: 'app-mi-perfil-paciente',
  imports: [MaterialModule, NgIf, NgFor,FormsModule, TitleCasePipe],
  templateUrl: './mi-perfil-paciente.component.html',
  styleUrl: './mi-perfil-paciente.component.scss'
})
export class MiPerfilPacienteComponent implements OnInit {
  usuario: any;

  constructor(private auth: AuthService,
    private historialMedica : HistorialMedicoService,private dialog: MatDialog, private pdf : PdfService,private usuarioService: UsuarioService) {}

  async ngOnInit() {
    const currentUser = await this.auth.obtenerSesion();
    if (currentUser) {
      this.usuario = await this.usuarioService.obtenerUsuario(currentUser.uid);
    }
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