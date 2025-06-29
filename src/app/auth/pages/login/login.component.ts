import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { NgIf } from '@angular/common';
import { LogsService } from '../../../core/services/logs.service';
import { ResaltarElementoDirective } from '../../../core/directivas/resaltar-elemento.directive';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule, ResaltarElementoDirective,SpinnerComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formulario: FormGroup;
  cargando = false;

  constructor (  private fb: FormBuilder,
  private authService: AuthService,
  private usuarioService: UsuarioService,
  private router: Router,
  private log : LogsService,
  private toast : ToastService){

    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  async login() {
    this.cargando = true;
    const { email, password } = this.formulario.value;

    //try {
      
      const cred = await this.authService.iniciarSesion(email, password).then(async (cred)=>{
        const user = cred.user;

        if (!user.emailVerified) {
          this.toast.mostrarMensaje('Debes verificar tu correo electrónico.', 'Inicio de sesion', 'info'); 
          this.cargando = false;
          return;
        }

        const datosUsuario = await this.usuarioService.obtenerUsuario(user.uid);

        console.log(datosUsuario);
        this.log.registrarIngreso(datosUsuario);
        if (datosUsuario!.rol === 'especialista' && datosUsuario!.aprobado == false) {
          this.toast.mostrarMensaje('Tu cuenta aun no fue aprobada por un administrador.', 'Perfil paciente', 'info');
          console.log(this.authService.cerrarSesion());
          this.cargando = false;
          return;
        } 
          this.toast.mostrarMensaje("Sesion iniciada con exito!", "Bienvenido", "success");
          this.formulario.reset();

          this.cargando = false;
            switch (datosUsuario.rol) {
            case 'paciente':
              this.router.navigate(['/paciente']);
              break;
            case 'especialista':
              this.router.navigate(['/especialista']);
              break;
            case 'admin':
              this.router.navigate(['/admin']);
              break;
          }
      }).catch(error =>{
        console.log("CARGANDO FALSE ");
        this.cargando = false;
        console.error(error);
        this.toast.mensajeErrorRegistro(error);
        //alert('Error al iniciar sesión: ' + error.message);
      });
      //setTimeout( async () => {       

        
    //  }, 3000);
   // } catch (error: any) {
      
    //}
  }
 
  loginRapido(tipo: any) {
    const credenciales: Record<any, { email: string; password: string }> = {
      paciente_1: {email : "seyoso7016@ofacer.com", password: "123456"},
      paciente_2: {email : "gedexo1675@kimdyn.com", password: "123456"},
      paciente_3: {email : "naceser407@kimdyn.com", password: "123456"},
      paciente: { email: 'becerraivan79@gmail.com', password: '1234567890' },
      especialista_1: { email: 'wowoxit646@kimdyn.com', password: '123456' },
      //
      especialista_2: { email: 'saweso8658@ofacer.com', password: '123456' },

      admin_1: { email: 'nasot18417@ofacer.com', password: '123456' }
    };

    const datos = credenciales[tipo];
    this.formulario.setValue({ email: datos.email, password: datos.password });
    //this.login();
  }

}
