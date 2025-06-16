import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule, SpinnerComponent, NgIf],
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
  async login_pre() {
    this.cargando = true;
    const { email, password } = this.formulario.value;

    try {
      setTimeout( async () => {       
        const cred = await this.authService.iniciarSesion(email, password);
        const user = cred.user;

        if (!user.emailVerified) {
          this.toast.mostrarMensaje('Debes verificar tu correo electrónico.', 'Inicio de sesion', 'info'); 
          this.cargando = false;
          return;
        }

        const datosUsuario = await this.usuarioService.obtenerUsuario(user.uid);

        console.log(datosUsuario);
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
      }, 3000);
    } catch (error: any) {
      console.log("CARGANDO FALSE ");
      this.cargando = false;
      console.error(error);
      this.toast.mensajeErrorRegistro(error);
      //alert('Error al iniciar sesión: ' + error.message);
    }
  }
  loginRapido(tipo: any) {
    const credenciales: Record<any, { email: string; password: string }> = {
      paciente_1: {email : "fwfunab657@tormails.com", password: "1234567890"},
      paciente_2: {email : "relok94284@ihnpo.com", password: "1234567890"},
      paciente_3: {email : "fwfunab657@tormails.com", password: "1234567890"},
      paciente: { email: 'becerraivan79@gmail.com', password: '1234567890' },
      especialista_1: { email: 'motasi2546@ihnpo.com', password: '1234567890' },
      admin_1: { email: 'pediyvasa@gmail.com', password: '1234567890' }
    };

    const datos = credenciales[tipo];
    this.formulario.setValue({ email: datos.email, password: datos.password });
    //this.login();
  }

}
