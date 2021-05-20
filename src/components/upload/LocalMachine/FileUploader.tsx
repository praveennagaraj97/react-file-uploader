import { Component } from 'react';
import DropZone from './DropZone';

import { UploadProgress } from '../../shared/UploadProgress/UploadProgress';

interface FileUploaderState {
  isUploading: boolean;
  uploadPercent: number;
}

export default class FileUploader extends Component<{}, FileUploaderState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isUploading: false,
      uploadPercent: 0,
    };
  }

  isdataUploading = (isUploading: boolean) => {
    console.log(isUploading);
    this.setState({
      isUploading,
    });
  };

  updateUploadedPercentage = (uploadPercent: number) => {
    this.setState({
      uploadPercent,
    });
  };

  set getFileDetails(file: File) {
    console.log(file);
  }

  render() {
    if (this.state.isUploading) {
      return (
        <UploadProgress uploadedPercent={this.state.uploadPercent}>
          <p>Last of Us</p>
        </UploadProgress>
      );
    }

    return (
      <DropZone
        isdataUploading={this.isdataUploading}
        updateUploadedPercentage={this.updateUploadedPercentage}
      />
    );
  }
}
