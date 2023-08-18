import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {SuccessCoachDialogService} from "../../services/success/success-coach-dialog.service";
import {ChatSuccessComponent} from "./chat-success/chat-success.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-coach-chat-dialog-success',
  template: ``,
  providers: [DialogService, DynamicDialogRef]
})
export class CoachChatDialogSuccessComponent implements OnDestroy, OnInit {

  private dialogSubscription!: Subscription;
  private refClose!: Subscription;

  constructor(public ref: DynamicDialogRef, private dialogService: DialogService, private successCoachService: SuccessCoachDialogService, private translate: TranslateService) {
    //empty constructor
  }

  showDialog(): void {
    let diaglogHeader: string = this.translate.instant('Talk with your AI coach about your successes.');
    this.ref = this.dialogService.open(ChatSuccessComponent
      , {
        header: diaglogHeader,
        width: '70%',
        height: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        draggable: true
      });
  }

  closeDialog() {
    this.ref.close();
  }

  ngOnInit() {
    this.successCoachService.showDialogBehaviour.next(false);
    this.dialogSubscription = this.successCoachService.showDialogBehaviour.subscribe(value => {
      if (value) {
        this.showDialog();
      } else {
        this.closeDialog();
      }
    });

    this.refClose = this.ref.onClose.subscribe(value => {
      this.successCoachService.showDialogBehaviour.next(false);
    })
  }

  ngOnDestroy(): void {
    this.refClose.unsubscribe();
    this.dialogSubscription.unsubscribe();
    this.closeDialog();

  }
}
