import { DragEvent } from 'react';
import fileIcon from '../../../assets/icons/file.png';

import './style.css';

export default function DropZone() {
  // const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  function stopPropogation(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  function onDropHandle(e: DragEvent) {
    e.preventDefault();

    const { files } = e.dataTransfer;

    if (files.length && files.length === 1) {
      handleSingleFile(files[0]);
    }
  }

  function handleSingleFile(file: File) {
    console.log(file);
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
