import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {SuccessCreateService} from "../../services/success/success-create.service";
import {TranslateService} from "@ngx-translate/core";
import {CreateSuccessComponent} from "./create-success/create-success.component";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-create-dialog-success',
  template: '',
  providers: [DialogService, MessageService, DynamicDialogRef]
})
export class CreateDialogSuccessComponent implements OnDestroy, OnInit {
  private dialogSubscription!: Subscription;
  private refClose!: Subscription;


  constructor(public ref: DynamicDialogRef, private dialogService: DialogService, private succesCreateService: SuccessCreateService, private translate: TranslateService) {
    //empty constructor
  }

  showDialog() {
    let titleDialog: string = this.translate.instant('Add your successes');
    this.ref = this.dialogService.open(CreateSuccessComponent
      , {
        header: titleDialog,
        width: '45%',
        height: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10,
        maximizable: true,
        draggable: true,
        styleClass: 'custom-dialog'
      });
  }

  closeDialog() {
    this.ref.close();
  }

  ngOnInit() {
    this.succesCreateService.showDialogBehaviour.next(false);
    this.dialogSubscription = this.succesCreateService.showDialogBehaviour.subscribe(value => {
      if (value) {
        this.showDialog();
      } else {
        this.closeDialog();
      }
    });

    this.refClose = this.ref.onClose.subscribe(value => {
      this.succesCreateService.showDialogBehaviour.next(false);
    })
  }

  ngOnDestroy(): void {
    this.refClose.unsubscribe();
    this.dialogSubscription.unsubscribe();
    this.closeDialog();
  }
}
