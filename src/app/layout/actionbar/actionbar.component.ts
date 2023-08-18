import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {BreadcrumbService} from "../../app.breadcrumb.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.scss']
})
export class ActionbarComponent implements OnDestroy, OnInit {
  subscription!: Subscription;
  items!: MenuItem[];

  constructor(public breadcrumbService: BreadcrumbService, public router: Router) {
    //empty constructor
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this.breadcrumbService.itemsHandler.subscribe(response => {
      this.items = response;
    });
  }
}
