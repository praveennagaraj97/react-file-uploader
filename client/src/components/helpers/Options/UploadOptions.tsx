import { PureComponent } from 'react';

import './style.css';

import folderICO from '../../../assets/icons/folder.png';
import linkICO from '../../../assets/icons/link.png';
import { UploadOptions as UploadOptionsEnum } from '../../../@types/enum';
import { OptionService } from '../../services/OptionService';
import { Subscription } from 'rxjs';

interface UploadOptionsState {
  selectedOption: UploadOptionsEnum;
}

interface UploadOptionsProps {
  optionService: OptionService;
}

export default class UploadOptions extends PureComponent<
  UploadOptionsProps,
  UploadOptionsState
> {
  selectedOptionSub$!: Subscription;

  constructor(props: UploadOptionsProps) {
    super(props);
    this.state = {
      selectedOption: UploadOptionsEnum.LOCAL,
    };
  }

  componentDidMount() {
    this.selectedOptionSub$ = this.props.optionService.selectedState$.subscribe(
      {
        next: (selectedOption) => {
          this.setState({
            selectedOption,
          });
        },
      }
    );
  }

  componentWillUnmount() {
    this.selectedOptionSub$.unsubscribe();
  }

  activeClassSetter(option: UploadOptionsEnum) {
    return this.state.selectedOption === option ? `active` : '';
  }

  render() {
    return (
      <div className="left-nav-tab">
        <ul>
          <li
            className={this.activeClassSetter(UploadOptionsEnum.LOCAL)}
            onClick={() => {
              this.props.optionService.setOption = UploadOptionsEnum.LOCAL;
            }}
          >
            <img src={folderICO} alt="folder_ico" />
          </li>
          <li
            className={this.activeClassSetter(UploadOptionsEnum.LINK)}
            onClick={() => {
              this.props.optionService.setOption = UploadOptionsEnum.LINK;
            }}
          >
            <img src={linkICO} alt="folder_ico" />
          </li>
        </ul>
      </div>
    );
  }
}
