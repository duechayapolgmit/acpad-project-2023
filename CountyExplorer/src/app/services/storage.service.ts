import { Injectable } from '@angular/core';
import { Storage, StorageReference, getBlob, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
// Service for Firebase Cloud Storage for images of counties
export class StorageService {

  constructor(private storage: Storage) { }

  // Get the image from the storage
  getImage(name: string): Promise<Blob>{
    name = name.toLowerCase();
    let imageRef: StorageReference = ref(this.storage, `county_images/${name}.jpg`);
    return getBlob(imageRef);
  }
}
