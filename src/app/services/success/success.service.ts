import {Injectable} from '@angular/core';
import {Success} from "../../domain/success/success";
import {DomainService} from "../domain.service";
import {SuccessTracker} from "../../domain/successTracker";
import {TranslateService} from "@ngx-translate/core";
import {ElementOfSuccess} from "../../domain/success/element-of-success";

@Injectable({
  providedIn: 'root'
})
export class SuccessService {
  private _elementsOfSuccess: ElementOfSuccess[] = [
    new ElementOfSuccess(this.translate.instant('Achieving (Desired) Results'), 'BR'),
    new ElementOfSuccess(this.translate.instant('Taking Action'), 'A'),
    new ElementOfSuccess(this.translate.instant('Gaining Insights (Aha Moments)'), 'I'),
    new ElementOfSuccess(this.translate.instant('Recognizing Mistakes'), 'HF'),
    new ElementOfSuccess(this.translate.instant('Acquiring New Understanding (Learning Moments)'), 'NB')
  ];
  get elementsOfSuccess(): ElementOfSuccess[] {
    return this._elementsOfSuccess.map(elementOfSucces => (new ElementOfSuccess(this.translate.instant(elementOfSucces._name), elementOfSucces.code)));
  }

  public findElementOfSuccessByCode(code: string): ElementOfSuccess | null {
    return this.elementsOfSuccess.find(elementOfSuccess => elementOfSuccess.code === code) || null;
  }

  constructor(private domainService: DomainService, private translate: TranslateService) {
  }

  addSuccess(success: Success) {
    let succesTracker: SuccessTracker = this.domainService.succesTrackerDomainBehaviorSubject.getValue();
    succesTracker.successes.push(success);
  }

  removeSuccess(succes: Success, indexToRemove: number) {
    let succesTracker: SuccessTracker = this.domainService.succesTrackerDomainBehaviorSubject.getValue();
    if (indexToRemove >= 0 && indexToRemove < succesTracker.successes.length) {
      let successes: Success[] = succesTracker.successes;
      successes.splice(indexToRemove, 1); // Remove 1 element starting from the specified index
      succesTracker.successes = successes;
      this.domainService.succesTrackerDomainBehaviorSubject.next(succesTracker);
    }
  }
}
