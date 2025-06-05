import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
 constructor(private storage: Storage) {}

  async subirImagen(path: string, archivo: File): Promise<string> {
    const storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, archivo);
    const url = await getDownloadURL(storageRef);
    return url;
  }
}