import { Component } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {Storage} from '@angular/fire/storage';
import { CommonModule } from '@angular/common'; // <-- ¡IMPORTANTE!
@Component({
  selector: 'app-test-imagen',
  imports: [CommonModule],
  templateUrl: './test-imagen.component.html',
  styleUrl: './test-imagen.component.scss',
})
export class TestImagenComponent {
  imagenSeleccionada: File | null = null;
  urlDescarga: string | null = null;
  constructor(private storage : Storage){}
  
  onArchivoSeleccionado(event: any) {
    this.imagenSeleccionada = event.target.files[0];
  }

  async subir() {
    if (this.imagenSeleccionada) {
      const nombre = new Date().getTime().toString(); // nombre único
      this.urlDescarga = await this.subirImagen(nombre, this.imagenSeleccionada);
      console.log('Imagen subida. URL:', this.urlDescarga);
    }
  }

  async subirImagen(nombreArchivo: string, archivo: File): Promise<string> {
    const ruta = `sala-medica/${nombreArchivo}`;
    const storageRef = ref(this.storage, ruta);

    await uploadBytes(storageRef, archivo);
    const url = await getDownloadURL(storageRef);
    return url;
  }

}
