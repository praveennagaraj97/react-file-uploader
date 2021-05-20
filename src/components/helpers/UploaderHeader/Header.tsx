import { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import { UploadOptions } from '../../../@types/enum';
import folderICO from '../../../assets/icons/folder.png';
import linkICO from '../../../assets/icons/link.png';
import { OptionService } from '../../../services/OptionService';
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
    let isCancelled = false;

    let subs$: Subscription;

    if (!isCancelled) {
      const { selectedState$ } = selectedOption;
      subs$ = selectedState$.subscribe({
        next: (value) => {
          setCurrentOption(value);
        },
      });
    }

    return () => {
      isCancelled = true;
      subs$.unsubscribe();
    };
  }, [selectedOption]);

  return (
    <header className="file-uploader-header">
      <img src={getSelectedServiceIcon(currentOption)} alt="" />
    </header>
  );
}
