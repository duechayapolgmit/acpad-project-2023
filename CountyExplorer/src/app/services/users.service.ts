import { Injectable } from '@angular/core';
import { CollectionReference, Firestore, collection, collectionData, query } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface User {
  email: string,
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private collection: CollectionReference;
  private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private usersSub!: Subscription;

  constructor(private firestore: Firestore) { 
    this.collection = collection(this.firestore, "user")
    this.subscribe();
  }

  private subscribe(): void {
    const userQuery = query(this.collection); // Query to collection
    const users$ = collectionData(userQuery) as Observable<User[]>; // Get observable
    this.usersSub = users$.subscribe((users)=> {
      this.users$.next(users);
    })
  }

  getUsers() {
    return this.users$.asObservable();
  }

}
