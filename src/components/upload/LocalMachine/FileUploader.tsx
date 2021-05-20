import { Component } from 'react';
import { Observable } from 'rxjs';
import { UploadProgress } from '../../shared/UploadProgress/UploadProgress';
import DropZone from './DropZone';

interface MultipeFilesUploadState extends MultipleFileState {
  uploadPerc?: number;
}

interface FileUploaderState {
  isUploading: boolean;
  uploadPercent: number;
  uploadingFile: File | null;
  isMultipleUploads: boolean;
  multipeFilesUploadState: MultipeFilesUploadState[];
}

export interface MultipleFileState {
  fileName: string;
  uploadedPercentage: Observable<number>;
}

export default class FileUploader extends Component<{}, FileUploaderState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isUploading: false,
      uploadPercent: 0,
      uploadingFile: null,
      isMultipleUploads: false,
      multipeFilesUploadState: [],
    };
  }

  isdataUploading = (isUploading: boolean) => {
    this.setState({
      isUploading,
    });
  };

  updateUploadedPercentage = (uploadPercent: number) => {
    this.setState({
      uploadPercent,
    });
  };

  getFileDetails = (file: File) => {
    this.setState({
      uploadingFile: file,
    });
  };

  setIsMultipleUploads = (isMultipleUploads: boolean) => {
    this.setState({
      isMultipleUploads,
    });
  };

  setMultipleFilesUploadState = (filesState: MultipleFileState[]) => {
    this.setState({
      multipeFilesUploadState: filesState,
    });
    filesState.forEach((each) => {
      each.uploadedPercentage.subscribe({
        next: (val) => {
          this.setState({
            multipeFilesUploadState: this.state.multipeFilesUploadState.map(
              (fileState) => {
                if (fileState.fileName === each.fileName) {
                  return { ...fileState, uploadPerc: val };
                }
                return fileState;
              }
            ),
          });
        },
      });
    });
  };

  render() {
    if (this.state.isMultipleUploads) {
      return this.state.multipeFilesUploadState.map((fileState, idx) => {
        return (
          <UploadProgress uploadedPercent={fileState.uploadPerc || 0} key={idx}>
            <div className="current-upload-stat">
              {Math.floor(fileState.uploadPerc || 0) === 100 ? (
                <p>Uploaded</p>
              ) : (
                <>
                  <p>{fileState.fileName}</p>
                  <p>{`${Math.floor(fileState.uploadPerc || 0)}%`}</p>
                  {/* <button
                    onClick={() => }
                  >
                    upload
                  </button> */}
                </>
              )}
            </div>
          </UploadProgress>
        );
      });
    }

    if (this.state.isUploading) {
      return (
        <UploadProgress uploadedPercent={this.state.uploadPercent}>
          <div className="current-upload-stat">
            {Math.floor(this.state.uploadPercent) === 100 ? (
              <p>Uploaded</p>
            ) : (
              <>
                <p>{this.state.uploadingFile?.name}</p>
                <p>{`${Math.floor(this.state.uploadPercent)}%`}</p>
              </>
            )}
          </div>
        </UploadProgress>
      );
    }

    return (
      <DropZone
        isdataUploading={this.isdataUploading}
        updateUploadedPercentage={this.updateUploadedPercentage}
        getFileDetails={this.getFileDetails}
        setIsMultipleUploads={this.setIsMultipleUploads}
        setMultipleFilesUploadState={this.setMultipleFilesUploadState}
      />
    );
  }
}
