import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltarElemento]',
  standalone: true
})
export class ResaltarElementoDirective {
 constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.expand();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.contract();
  }

  private expand() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.1)');
  }

  private contract() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }
}
