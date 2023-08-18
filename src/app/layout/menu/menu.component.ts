import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from "../../app.main.component";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  originalModel: any[] = [];
  model!: any[];

  constructor(public app: AppMainComponent, private translate: TranslateService) {
    //empty constructor
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.originalModel = [
        {icon: 'pi pi-fw pi-home', label: 'Dashboard', routerLink: ['/']},
        {label: 'Successes', icon: 'pi pi-fw pi-pencil', routerLink: ['/success']},
        {label: 'Profile', icon: 'pi pi-fw pi-user', routerLink: ['/profile']},
        {label: 'History', icon: 'pi pi-fw pi-history', routerLink: ['/history']},
        {label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/settings']}
      ];


      this.model = JSON.parse(JSON.stringify(this.originalModel));
      this.model.forEach(value => {
        value.label = this.translate.instant(value.label);
      })
    })
  }
}
