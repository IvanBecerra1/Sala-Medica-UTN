import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCentrarTexto]',
  standalone: true
})
export class CentrarTextoDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'text-align', 'center');
  }
}