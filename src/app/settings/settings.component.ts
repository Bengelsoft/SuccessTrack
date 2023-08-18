import {Component, OnInit} from '@angular/core';
import {SuccessTracker} from "../domain/successTracker";
import {DomainService} from "../services/domain.service";
import {SettingsService} from "../services/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  // ngOnInit(): void {
  //   let a = this.domainService.succesTrackerDomainBehaviorSubject.getValue();
  //   this.autoSave = a.settings.autoSave;
  // }

  succesTrackerDomain: string = "";
  protected apiKey: string = "";
  protected readonly SuccesTracker = SuccessTracker;
  protected autoSave: boolean = false;

  constructor(private domainService: DomainService, private settingsService: SettingsService) {
    domainService.succesTrackerDomainBehaviorSubject.subscribe(value => {
      this.succesTrackerDomain = JSON.stringify(value, null, 2);
      this.autoSave = value.settings.autoSave;
      this.apiKey = value.settings.apiKey;
    })

  }

  setId() {
    this.settingsService.setOpenAiApiKey(this.apiKey);
  }

  editSuccesTrackerDomain() {
    let editVersion: SuccessTracker = JSON.parse(this.succesTrackerDomain);
    if (editVersion != this.domainService.succesTrackerDomainBehaviorSubject.getValue()) {
      this.domainService.succesTrackerDomainBehaviorSubject.next(editVersion);
    }

  }

  changeAutoSave() {
    this.settingsService.setAutoSave(this.autoSave);
  }
}
