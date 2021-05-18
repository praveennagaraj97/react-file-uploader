import UploadOptions from './helpers/Options/UploadOptions';
import './style.css';

export default function App() {
  return (
    <div className="file-upload-main__container">
      <header className="file-uploader-header"></header>

      <UploadOptions />
    </div>
  );
}
