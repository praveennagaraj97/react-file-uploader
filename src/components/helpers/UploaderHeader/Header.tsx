import { useEffect, useState } from 'react';
import { UploadOptions } from '../../../@types/enum';
import { OptionService } from '../../services/OptionService';

import folderICO from '../../../assets/icons/folder.png';
import linkICO from '../../../assets/icons/link.png';

import './style.css';

interface HeaderProps {
  selectedOption: OptionService;
}

export default function Header({ selectedOption }: HeaderProps) {
  const [currentOption, setCurrentOption] = useState<UploadOptions>(
    UploadOptions.LOCAL
  );

  function getSelectedServiceIcon(options: UploadOptions): string {
    switch (options) {
      case UploadOptions.LOCAL:
        return folderICO;
      case UploadOptions.LINK:
        return linkICO;
      default:
        return folderICO;
    }
  }

  useEffect(() => {
    const { selectedState$ } = selectedOption;

    selectedState$.subscribe({
      next: (value) => {
        setCurrentOption(value);
      },
    });
  }, [selectedOption]);

  return (
    <header className="file-uploader-header">
      <img src={getSelectedServiceIcon(currentOption)} alt="" />
    </header>
  );
}
