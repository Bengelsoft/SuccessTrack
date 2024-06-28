import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { Success } from 'src/app/domain/success/success';
import { TableRowSelectEvent, TableRowUnSelectEvent } from 'primeng/table';
import { SuccessService } from 'src/app/services/success/success.service';
import { ElementOfSuccess } from 'src/app/domain/success/element-of-success';


@Component({
  selector: 'app-list-elements-of-success',
  standalone: false,
  templateUrl: './list-elements-of-success.component.html',
  styleUrl: './list-elements-of-success.component.scss'
})
export class ListElementsOfSuccessComponent implements OnInit {

  @Input() success!: Success;
  selectedItems: any[] = []; 

  ngOnInit() {
    if (!this.success) {
      throw new Error('Input property "data" is required');
    }
    this.selectedItems = this.success.elementsOfSuccessCodes.map(code => new ElementOfSuccess("", code));
  }


  updateSelectedItems() {
    this.selectedItems = this.success.elementsOfSuccessCodes.filter(code =>
      this.success.elementsOfSuccessCodes.includes(code));
    console.log(this.selectedItems);
  }

  constructor(public succesService: SuccessService) {
  }

  onRowSelect(event: any, success: Success) {
    success.elementsOfSuccessCodes.push(event.data.code);
    this.updateSelectedItems();
  }

  onRowUnselect(event: any, success: Success) {
    success.elementsOfSuccessCodes = success.elementsOfSuccessCodes.filter(code => code !== event.data.code);
    this.updateSelectedItems();
  }

}
