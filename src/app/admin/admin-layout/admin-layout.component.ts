import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  trigger,
  transition,
  query,
  style,
  animate,
  group
} from '@angular/animations';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
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
            //animate('200ms ease-out', style({ opacity: 0, transform: 'translateX(-40px)' }))
            animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(-40px)' }))
          ], { optional: true }),
          query(':enter', [
            //style({ opacity: 0, transform: 'translateX(40px)' }),
            //animate('300ms ease-in', style({ opacity: 1, transform: 'translateX(0)' }))
            style({ opacity: 0, transform: 'translateY(40px)' }),
            animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AdminLayoutComponent implements AfterViewInit {
  constructor(private cdRef: ChangeDetectorRef) {}
ngAfterViewInit() {
    this.cdRef.detectChanges(); // 🔧 Forzar el segundo chequeo
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
