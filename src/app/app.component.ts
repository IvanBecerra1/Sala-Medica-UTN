import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestImagenComponent } from "./test/test-imagen/test-imagen.component";
import { MaterialModule } from './material.module';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sala-medica';
}
