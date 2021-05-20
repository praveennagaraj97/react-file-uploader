import { ReactChild, useEffect, useRef } from 'react';
import './style.css';

interface UploadProgressProps {
  uploadedPercent: number;
  children?: ReactChild;
}

export const UploadProgress = ({
  uploadedPercent,
  children,
}: UploadProgressProps) => {
  const uploadProgressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (uploadProgressBarRef.current) {
      uploadProgressBarRef.current.style.width = `${uploadedPercent}%`;
    }
  }, [uploadedPercent]);

  return (
    <div className="progress-bar__container">
      {children && <div className="progress_file-details">{children}</div>}
      <div ref={uploadProgressBarRef} className="progress-bar__status"></div>
    </div>
  );
};
