import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionData, query } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface County { // schema for each county
  name: string,
  picture: string,
  description: string,
  area: number,
  population: number
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  private collection: CollectionReference;
  private counties$: BehaviorSubject<County[]> = new BehaviorSubject<County[]>([]);
  private countiesSub!: Subscription;

  constructor(private firestore: Firestore) { 
    this.collection = collection(this.firestore, "county")
    this.subscribe();
  }

  private subscribe(): void {
    const countyQuery = query(this.collection); // Query to collection
    const counties$ = collectionData(countyQuery) as Observable<County[]>; // Get observable
    this.countiesSub = counties$.subscribe((counties)=> {
      this.counties$.next(counties);
    })
  }

  readCounties() {
    return this.counties$.asObservable();
  }
  
}
