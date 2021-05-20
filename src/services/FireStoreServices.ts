import firebase from 'firebase/app';
import { Observable } from 'rxjs';

import { fireStore } from '../config/firebase';

export class FireStoreService {
  private storage: firebase.storage.Reference;

  constructor() {
    this.storage = fireStore.ref('images/');
  }

  singleFileUploader(file: File): Observable<number> {
    const uploadRef = this.storage.child(
      file.name || (Math.random() * 1000).toString()
    );

    const observer = new Observable<number>((subscriber) => {
      uploadRef.put(file).on(firebase.storage.TaskEvent.STATE_CHANGED, {
        next: (snapshot) => {
          const completedPercent =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          subscriber.next(completedPercent);
        },
        error: (storageError) => {
          subscriber.error(storageError);
        },
        complete: () => {
          subscriber.complete();
        },
      });
    });

    return observer;
  }
}
