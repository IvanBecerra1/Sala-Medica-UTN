import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestImagenComponent } from "./test/test-imagen/test-imagen.component";
import { MaterialModule } from './material.module';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sala-medica';
}
