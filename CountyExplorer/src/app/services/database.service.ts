import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, GeoPoint, collection, collectionData, query } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface County { // schema for each county
  name: string,
  picture: string,
  description: string,
  area: number,
  population: number,
  position: GeoPoint
}

@Injectable({
  providedIn: 'root'
})
// Service for counties firestore
export class DatabaseService {

  private collection: CollectionReference;
  private counties$: BehaviorSubject<County[]> = new BehaviorSubject<County[]>([]);
  private countiesSub!: Subscription;

  constructor(private firestore: Firestore) { 
    this.collection = collection(this.firestore, "county")
    this.subscribe();
  }

  // Subscribes to the counties collection
  private subscribe(): void {
    const countyQuery = query(this.collection); // Query to collection
    const counties$ = collectionData(countyQuery) as Observable<County[]>; // Get observable
    this.countiesSub = counties$.subscribe((counties)=> {
      this.counties$.next(counties);
    })
  }

  // Get the counties list as Observable
  getCounties() {
    return this.counties$.asObservable();
  }
  
}
