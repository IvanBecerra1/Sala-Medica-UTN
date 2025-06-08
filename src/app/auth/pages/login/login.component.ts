import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formulario: FormGroup;

  constructor (  private fb: FormBuilder,
  private authService: AuthService,
  private usuarioService: UsuarioService,
  private router: Router){

    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  async login() {
    const { email, password } = this.formulario.value;

    try {
      const cred = await this.authService.iniciarSesion(email, password);
      const user = cred.user;

      if (!user.emailVerified) {
        alert('Debes verificar tu correo electrónico.');
        return;
      }

      const datosUsuario = await this.usuarioService.obtenerUsuario(user.uid);

      console.log(datosUsuario);
      if (datosUsuario!.rol === 'especialista' && datosUsuario!.aprobado == false) {
        alert('Tu cuenta aun no fue aprobada por un administrador.');
        console.log(this.authService.cerrarSesion());
        return;
      }

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

    } catch (error: any) {
      console.error(error);
      alert('Error al iniciar sesión: ' + error.message);
    }
  }
  loginRapido(tipo: any) {
    const credenciales: Record<any, { email: string; password: string }> = {
      paciente: { email: 'becerraivan79@gmail.com', password: '1234567890' },
      especialista: { email: 'codescripter01@gmail.com', password: '123456' },
      admin: { email: 'pediyvasa@gmail.com', password: '1234567890' }
    };

    const datos = credenciales[tipo];
    this.formulario.setValue({ email: datos.email, password: datos.password });
    //this.login();
  }

}
