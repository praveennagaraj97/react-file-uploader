import { BehaviorSubject } from 'rxjs';
import { UploadOptions } from '../../@types/enum';

export class OptionService {
  private currentOption$ = new BehaviorSubject(UploadOptions.LOCAL);

  set setOption(state: UploadOptions) {
    this.currentOption$.next(state);
  }

  get selectedState$(): BehaviorSubject<UploadOptions> {
    return this.currentOption$;
  }
}
