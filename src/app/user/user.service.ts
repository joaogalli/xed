import { Injectable } from '@angular/core';
import {AngularFireAction, AngularFireDatabase, AngularFireList, DatabaseSnapshot} from '@angular/fire/database';
import {User} from './user.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs';

@Injectable()
export class UserService {
  usersRef: AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(environment.firebase_rtdb_root + 'users');
  }

  createUser(user: User) {
    this.usersRef.set(user.id, user);
  }

  findByUid(uid: string): Promise<User> {
    const promise: Promise<User> = new Promise<User>((resolve) => {
        this.db.object(environment.firebase_rtdb_root + 'users/' + uid)
          .snapshotChanges()
          .subscribe((action: AngularFireAction<DatabaseSnapshot<any>>) => {
            resolve(action.payload.val());
          });
      }
    );
    return promise;
  }

  findByEmail(email: string): Observable<User> {
    return new Observable(subscriber => {
      const listSubscribe: Subscription =
        this.db.list(
          environment.firebase_rtdb_root + 'users',
            ref => ref.orderByChild('email').equalTo(email)
        )
        .snapshotChanges()
        .subscribe((action: AngularFireAction<DatabaseSnapshot<any>>[]) => {
          console.info(action);
          action.forEach((value: AngularFireAction<DatabaseSnapshot<any>>) => {
            subscriber.next(
              value.payload.val()
            );
          });
          subscriber.complete();
          listSubscribe.unsubscribe();
        });
    });
  }

}
