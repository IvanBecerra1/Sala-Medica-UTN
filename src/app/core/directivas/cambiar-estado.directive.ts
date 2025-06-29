import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[colorEstado]',
  standalone: true
})
export class CambiarEstadoDirective {
 @Input('colorEstado') aprobado: boolean | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.aprobado === true) {
      this.renderer.setStyle(this.el.nativeElement, 'color', '#4caf50'); 
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    } else if (this.aprobado === false) {
      this.renderer.setStyle(this.el.nativeElement, 'color', '#f44336'); 
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    }
  }
}