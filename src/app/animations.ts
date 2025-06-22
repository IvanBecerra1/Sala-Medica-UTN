import { 
  trigger, 
  transition, 
  style, 
  animate, 
  query, 
  group 
} from '@angular/animations';

// Animación 1: Fade
export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ opacity: 0 }))
  ])
]);

// Animación 2: Slide
export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('500ms ease-in-out', style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('500ms ease-in-out', style({ transform: 'translateX(-100%)' }))
  ])
]);