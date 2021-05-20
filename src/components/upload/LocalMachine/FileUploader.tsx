import { Component } from 'react';
import { UploadProgress } from '../../shared/UploadProgress/UploadProgress';
import DropZone from './DropZone';

interface FileUploaderState {
  isUploading: boolean;
  uploadPercent: number;
  uploadingFile: File | null;
}

export default class FileUploader extends Component<{}, FileUploaderState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isUploading: false,
      uploadPercent: 0,
      uploadingFile: null,
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

  render() {
    if (this.state.isUploading) {
      return (
        <UploadProgress uploadedPercent={this.state.uploadPercent}>
          <div className="current-upload-stat">
            {Math.floor(this.state.uploadPercent) === 100 ? (
              <p>Uploaded</p>
            ) : (
              <>
                <p>
                  {(this.state.uploadingFile?.name.slice(0, 90) || 'file') +
                    '...'}
                </p>
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
      />
    );
  }
}
