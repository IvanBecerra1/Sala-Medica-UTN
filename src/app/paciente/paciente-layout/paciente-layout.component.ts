import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  trigger,
  transition,
  query,
  style,
  animate,
  group
} from '@angular/animations';

@Component({
  selector: 'app-paciente-layout',
  imports:  [RouterOutlet],
  templateUrl: './paciente-layout.component.html',
  styleUrl: './paciente-layout.component.scss',
 animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%'
          })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('200ms ease-out', style({ opacity: 0, transform: 'translateX(-40px)' }))
          ], { optional: true }),
          query(':enter', [
            style({ opacity: 0, transform: 'translateX(40px)' }),
            animate('300ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class PacienteLayoutComponent {
prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
