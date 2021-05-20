import { DragEvent, useEffect, useState } from 'react';
import { delay, tap } from 'rxjs/operators';
import fileIcon from '../../../assets/icons/file.png';
import { FireStoreService } from '../../../services/FireStoreServices';
import { MultipleFileState } from './FileUploader';
import './style.css';

interface DropZoneProps {
  isdataUploading: (state: boolean) => void;
  updateUploadedPercentage: (percent: number) => void;
  getFileDetails: (file: File) => void;
  setIsMultipleUploads: (isMultiple: boolean) => void;
  setMultipleFilesUploadState: (files: MultipleFileState[]) => void;
}

export default function DropZone({
  isdataUploading,
  updateUploadedPercentage,
  getFileDetails,
  setIsMultipleUploads,
  setMultipleFilesUploadState,
}: DropZoneProps) {
  const [fireStoreInstance, setFireStoreInstance] =
    useState<FireStoreService>();

  useEffect(() => {
    const fireStoreServiceInstance = new FireStoreService();

    setFireStoreInstance(fireStoreServiceInstance);
  }, [setFireStoreInstance]);

  function stopPropogation(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  function onDropHandle(e: DragEvent) {
    e.preventDefault();

    const { files } = e.dataTransfer;

    if (!files.length) {
      return;
    }
    if (files.length === 1) {
      handleSingleFile(files[0]);
    } else {
      handleMultipleFiles(files);
    }
  }

  function handleSingleFile(file: File) {
    isdataUploading(true);
    getFileDetails(file);
    const subs$ = fireStoreInstance?.singleFileUploader(file).subscribe({
      next: (percent) => {
        console.log(`Uploaded`, percent);
        updateUploadedPercentage(percent);
      },
      error: (err) => {
        isdataUploading(false);
      },
      complete() {
        subs$?.unsubscribe();
      },
    });
  }

  function handleMultipleFiles(files: FileList) {
    const uploadState: MultipleFileState[] = [];

    fireStoreInstance
      ?.multipleFilesUploader(files)
      .pipe(
        delay(500),
        tap((_) => {
          setIsMultipleUploads(true);
        })
      )
      .subscribe({
        next: (observer) => {
          observer.forEach((uploads) => {
            uploadState.push({
              fileName: uploads.file.name,
              uploadedPercentage: uploads.uploadState,
            });
          });

          setMultipleFilesUploadState(uploadState);
        },
      });
  }

  return (
    <div
      className="drop-zone__container"
      onDrop={onDropHandle}
      onDragOver={stopPropogation}
    >
      <img src={fileIcon} alt="file_ico" />
      <p>Select files to upload</p>
      <em>or Drag and Drop files</em>
    </div>
  );
}
