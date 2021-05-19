import { PureComponent } from 'react';
import { Subscription } from 'rxjs';
import UploadOptions from './helpers/Options/UploadOptions';
import Header from './helpers/UploaderHeader/Header';
import { OptionService } from './services/OptionService';
import './style.css';
import FileUploader from './upload/LocalMachine/FileUploader';

export default class App extends PureComponent<{}, {}> {
  selectedOptionSub$!: Subscription;

  constructor(props: any, private optionsService: OptionService) {
    super(props);
    this.optionsService = new OptionService();
  }

  render() {
    return (
      <div className="file-upload-main__container">
        <Header selectedOption={this.optionsService} />
        <main className="main-container">
          <UploadOptions optionService={this.optionsService} />
          <div className="uploader-content">
            <FileUploader />
          </div>
        </main>
      </div>
    );
  }
}
