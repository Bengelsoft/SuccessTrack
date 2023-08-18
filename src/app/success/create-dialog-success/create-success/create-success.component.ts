import {Component} from '@angular/core';
import {SuccessCreateService} from "../../../services/success/success-create.service";
import {SuccessService} from "../../../services/success/success.service";
import {Success} from "../../../domain/success/success";

@Component({
  selector: 'app-create-success',
  templateUrl: './create-success.component.html',
  styleUrls: ['create-success-component.scss']
})
export class CreateSuccessComponent {

  constructor(public successCreateService: SuccessCreateService, public succesService: SuccessService) {
    //empty constructor
  }

  add() {
    this.successCreateService.addSuccessToDialog([new Success(new Date(), "", [])]);
  }


  save(i: number) {
    this.successCreateService.save(i);
  }

  remove(i: number) {
    this.successCreateService.remove(i);
  }

}
