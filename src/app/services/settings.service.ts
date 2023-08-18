import {Injectable} from '@angular/core';
import {DomainService} from "./domain.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private domainService : DomainService) {
  }


  getOpenAiApiKey() {
    return this.domainService.succesTrackerDomainBehaviorSubject.getValue().settings.apiKey;
  }

  setOpenAiApiKey(value: string) {
    let updateSuccesTracker = this.domainService.succesTrackerDomainBehaviorSubject.getValue();
    updateSuccesTracker.settings.apiKey = value;
    this.domainService.succesTrackerDomainBehaviorSubject.next(updateSuccesTracker);

  }

  setAutoSave(autoSave: boolean) {
    let updateSuccesTracker = this.domainService.succesTrackerDomainBehaviorSubject.getValue();
    updateSuccesTracker.settings.autoSave = autoSave;
    this.domainService.succesTrackerDomainBehaviorSubject.next(updateSuccesTracker);
  }

  isApiKeyPresent() {
    return this.getOpenAiApiKey().length == 0;
  }
}
