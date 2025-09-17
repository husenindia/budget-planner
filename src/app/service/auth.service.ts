import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, idToken, signInWithEmailAndPassword, signOut, updateProfile, UserCredential } from '@angular/fire/auth';
import { doc, Firestore, serverTimestamp, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface AppUser {
  uid: string;
  email: string | null;
  displayName?: string;
  createdAt?: any; // serverTimestamp
  // add other profile fields here
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // observable of current user (null if not logged in)
  readonly user$ = authState(this.auth) as Observable<any>;

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}

  // register + create user doc in Firestore
  async register(displayName: string, email: string, password: string): Promise<UserCredential> {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    const uid = cred.user.uid;

    // prepare profile document
    const userDocRef = doc(this.firestore, `users/${uid}`);
    const userData: AppUser = {
      uid,
      email: cred.user.email,
      displayName,
      createdAt: serverTimestamp()
    };

    // write user profile to Firestore (document id = uid)
    await setDoc(userDocRef, userData);

    return cred;
  }

  // login
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  // logout
  async logout() {
    await signOut(this.auth);
    await this.router.navigate(['/login']);
  }
}
