import {Injectable} from '@angular/core';
import {DomainService} from "./domain.service";
import {SuccessTracker} from "../domain/successTracker";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private domainService: DomainService) {
  }

  getUserName(): string {
    return this.domainService.succesTrackerDomainBehaviorSubject.getValue().user.name;
  }

  setDefaultLang(defaultLang: string) {
    let succesTracker: SuccessTracker = this.domainService.succesTrackerDomainBehaviorSubject.getValue();
    succesTracker.user.defaultLang = defaultLang;
    this.domainService.succesTrackerDomainBehaviorSubject.next(succesTracker);
  }

  setUserName(name: string) {
    let succesTracker: SuccessTracker = this.domainService.succesTrackerDomainBehaviorSubject.getValue();
    succesTracker.user.name = name;
    this.domainService.succesTrackerDomainBehaviorSubject.next(succesTracker);
  }

}
