import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, query, collectionData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Service for authentication
export class AuthService {

  private _loginStatus: boolean = false;
  private currentUser$: BehaviorSubject<any> = new BehaviorSubject<string>("");

  constructor(private auth: Auth, private firestore: Firestore) {
  
  }

  // Sign up
  async register({email, username, password}: {email: string; username:string; password: string}){
    try {
      const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
      const ref = doc(this.firestore, `user/${credentials.user.uid}`);
      setDoc(ref, {email, username});
      return credentials;
    } catch (e) {
      console.log ("Error: ", e);
      return null;
    }
  }

  // Sign in
  async login({email, password}: {email: string; password: string}) {
    try {
      const credentials = await signInWithEmailAndPassword(this.auth, email, password);
      return credentials;
    } catch (e) {
      console.log ("Error: ", e);
      return null;
    }
  }

  // Sign out
  logout() {
    return signOut(this.auth);
  }

  // Reset Password
  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  
}
