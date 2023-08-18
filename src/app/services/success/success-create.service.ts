import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Success} from "../../domain/success/success";
import {SuccessService} from "./success.service";

@Injectable({
  providedIn: 'root'
})
export class SuccessCreateService {

  public newSuccessList: Success[] = [];
  private _showDialogBehaviour: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showProgress: boolean = false;

  get showDialog(): boolean {
    return this._showDialogBehaviour.getValue();
  }

  set showDialog(value: boolean) {
    this._showDialogBehaviour.next(value);
  }

  get showDialogBehaviour(): BehaviorSubject<boolean> {
    return this._showDialogBehaviour;
  }

  closeDialog() {
    this._showDialogBehaviour.next(false);
  }

  addSuccessToDialog(successes: Success[]) {
    this.newSuccessList = this.newSuccessList.concat(successes);
  }

  constructor(private successService : SuccessService) {
  }

  save(i: number) {
    let addSucces= this.newSuccessList.at(i);
    this.newSuccessList.splice(i, 1);
    if (addSucces !== undefined) {
      this.successService.addSuccess(addSucces);
    }

  }

  remove(i: number) {
    this.newSuccessList.splice(i, 1);
  }
}
