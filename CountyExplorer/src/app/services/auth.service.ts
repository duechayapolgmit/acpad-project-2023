import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginStatus: boolean = false;

  constructor(private auth: Auth, private firestore: Firestore) { }

  getLoginStatus() { 
    const subscription = new BehaviorSubject<boolean>(this._loginStatus);
    return subscription.asObservable();
  };
  setloginStatus(status: boolean): void { this._loginStatus = status };

  // Sign up
  async register({email, password}: {email: string; password: string}){
    try {
      const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
      const ref = doc(this.firestore, `user/${credentials.user.uid}`);
      setDoc(ref, {email});
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
