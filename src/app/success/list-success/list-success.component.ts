import {Component, OnDestroy, OnInit} from '@angular/core';
import {Success} from "../../domain/success/success";
import {SuccessService} from "../../services/success/success.service";
import {MessageService} from "primeng/api";
import {DomainService} from "../../services/domain.service";
import {TranslateService} from "@ngx-translate/core";
import {SuccessTracker} from "../../domain/successTracker";
import {TimeFormatService} from "../../services/time-format.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-list-success',
  templateUrl: './list-success.component.html'
})
export class ListSuccessComponent implements OnDestroy, OnInit{
  protected succesList: Success[] = [];

  // @ts-ignore
  private successsenSubject: Subscription;

  constructor(public succesService: SuccessService, private messageService: MessageService, private domainService: DomainService, private translate: TranslateService, private timeFormatService: TimeFormatService) {
    //empty contructor
  }

  onRowEditInit(succes: Success) {
  }

  onRowEditSave(succes: Success) {
    let succesTracker: SuccessTracker = this.domainService.succesTrackerDomainBehaviorSubject.getValue();
    succesTracker.successes = this.succesList;
    this.domainService.succesTrackerDomainBehaviorSubject.next(succesTracker);
  }

  onRowRemove(succes: Success, index: number) {
    this.succesService.removeSuccess(succes, index);
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: this.translate.instant('Success') + ': ' + succes.successDescription + ' ' + this.translate.instant('deleted!')
    });

  }

  formatDate(dateOfSucces: any) {
    let currentLang = this.translate.currentLang;
    return this.timeFormatService.formatDate(currentLang, 'EEEE, d MMMM', dateOfSucces);
  }

  ngOnDestroy(): void {
    this.successsenSubject.unsubscribe();
  }

  ngOnInit(): void {
    this.successsenSubject = this.domainService.succesTrackerDomainBehaviorSubject.subscribe(value => {
      this.succesList = value.successes;
    })
  }

  protected readonly Success = Success;
}
