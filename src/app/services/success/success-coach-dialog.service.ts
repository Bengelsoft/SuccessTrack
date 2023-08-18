import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuccessCoachDialogService {

  private _showDialogBehaviour: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get showDialog(): boolean {
    return this._showDialogBehaviour.getValue();
  }

  public set showDialog(value: boolean) {
    this._showDialogBehaviour.next(value);
  }

  get showDialogBehaviour(): BehaviorSubject<boolean> {
    return this._showDialogBehaviour;
  }

  closeDialog() {
    this._showDialogBehaviour.next(false);
  }
}
