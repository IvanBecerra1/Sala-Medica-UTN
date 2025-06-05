import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestImagenComponent } from "./test/test-imagen/test-imagen.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TestImagenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sala-medica';
}
