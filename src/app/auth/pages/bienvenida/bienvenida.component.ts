import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-bienvenida',
  imports: [MaterialModule],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.scss'
})
export class BienvenidaComponent {
constructor() {
}

}
