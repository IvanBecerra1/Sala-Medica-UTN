import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ToastService } from '../../../core/services/toast.service';
import { fadeAnimation } from '../../../animations';

@Component({
  selector: 'app-bienvenida',
  imports: [MaterialModule],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.scss',
  animations: [fadeAnimation]
})
export class BienvenidaComponent {
constructor() {
}

}
