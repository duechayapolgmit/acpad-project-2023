import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CollectionReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, query, where } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface FavouriteCounty {
  id?: string;
  county: string;
  user?: string;
}

@Injectable({
  providedIn: 'root'
})

export class FavouritesService {

  private collectionRef: CollectionReference;
  private favourites$: BehaviorSubject<FavouriteCounty[]> = new BehaviorSubject<FavouriteCounty[]>([]);
  private subscription!: Subscription;

  constructor(private firestore: Firestore, private auth: Auth) { 
    this.collectionRef = collection(this.firestore, 'favourites');
    this.subscribeAuth();
  }

  private subscribeAuth(): void {
    onAuthStateChanged(this.auth, user => {
      if (user) this.subscribeToFavourites(user.uid);
      else this.unsubscribeToFavourites();
    })
  }

  private subscribeToFavourites(userId: string): void {
    const queryFav = query(this.collectionRef, where('user', '==', userId));
    const favourites$ = collectionData(queryFav, {idField: 'id'}) as Observable<FavouriteCounty[]>;

    this.subscription = favourites$.subscribe(favs => this.favourites$.next(favs))
  }

  private unsubscribeToFavourites(): void {
    this.favourites$.next([]);
    if (this.subscription) this.subscription.unsubscribe();
  }

  async addFavourite(fav: FavouriteCounty) {
    try {
      await addDoc(this.collectionRef, {...fav, user: this.auth.currentUser?.uid});
    } catch (e) {
      console.log("[ERROR] ", e);
    }
  }

  async removeFavourite(fav: FavouriteCounty) {
    try {
      const ref = doc(this.firestore, `favourites/${fav.id}`);
      await deleteDoc(ref);
    } catch (e) {
      console.log("[ERROR] ", e);
    }
  }

  getFavourites() {
    return this.favourites$.asObservable();
  }
}
