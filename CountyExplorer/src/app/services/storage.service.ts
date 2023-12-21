import { Injectable } from '@angular/core';
import { Storage, StorageReference, getBlob, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  getImage(name: string): Promise<Blob>{
    name = name.toLowerCase();
    let imageRef: StorageReference = ref(this.storage, `county_images/${name}.jpg`);
    return getBlob(imageRef);
  }
}
