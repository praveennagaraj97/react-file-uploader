import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { fireStore } from '../config/firebase';

export class FireStoreService {
  private storage: firebase.storage.Reference;

  constructor() {
    this.storage = fireStore.ref();
  }

  singleFileUploader(file: File): Observable<number> {
    const uploadRef = this.storage.child(
      (file.type || 'unstructured') + '/' + file.name ||
        (Math.random() * 1000).toString()
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

  multipleFilesUploader(files: FileList): Observable<UploadState[]> {
    const observer = new Observable<UploadState[]>((subscriber) => {
      const uploaderRef: { uploadState: Observable<number>; file: File }[] = [];

      for (let i = 0; i < files.length; i++) {
        uploaderRef.push({
          file: files[i],
          uploadState: this.singleFileUploader(files[i]),
        });
      }

      subscriber.next(uploaderRef);
    });

    return observer;
  }
}

interface UploadState {
  uploadState: Observable<number>;
  file: File;
}
