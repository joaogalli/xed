import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase/app';

@Injectable()
export class AuthService {
  public user: User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user: User) => {
      this.user = user;
    });
  }

  getUserDbId(): string {
    return (this.user) ? this.user.uid : null;
  }

  signUpWithEmailAndPassword(email: string, password: string): Promise<User> {
    const promise: Promise<User> = new Promise<User>((resolve, reject) => {
      this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password)
        .then(
          (value: any) => {
            if (value && value['user']) {
              resolve(value['user']);
            } else if (this.afAuth.auth.currentUser) {
              resolve(this.afAuth.auth.currentUser);
            } else {
              resolve(null);
            }
          },
          (reason: any) => {
            reject(reason);
          }
        ).catch((reason: any) => {
          reject(reason);
      });
    });

    return promise;
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<User> {
    const promise: Promise<User> = new Promise<User>((resolve, reject) => {
      this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then(
          (value: {}) => {
            if (value && value['user']) {
              resolve(value['user']);
            } else {
              reject('No user found.');
            }
          },
          (reason: any) => {
            reject(reason);
          }
        ).catch((reason: any) => {
          reject(reason);
        });
    });

    return promise;
  }

  getAuthenticatedUser() {
    return this.afAuth.authState;
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
