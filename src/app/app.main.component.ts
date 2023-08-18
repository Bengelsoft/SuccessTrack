import {Component} from '@angular/core';
import {MenuService} from './layout/menu/service/app.menu.service';
import {PrimeNGConfig} from 'primeng/api';
import {AppComponent} from './app.component';
import {DomainService} from "./services/domain.service";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.main.component.html'
})
export class AppMainComponent {

  configDialogActive = false;

  topbarItemClick!: boolean;

  activeTopbarItem: any;

  menuHoverActive!: boolean;

  topbarMenuActive!: boolean;

  overlayMenuActive!: boolean;

  menuClick!: boolean;

  configClick!: boolean;

  overlayMenuMobileActive!: boolean;

  layout = 'layout-blue';

  constructor(private menuService: MenuService, private primengConfig: PrimeNGConfig, public app: AppComponent, public domain: DomainService, public translate: TranslateService) {
    translate.addLangs(['en', 'nl', 'fr']);
    // translate.setDefaultLang("en");
    translate.use('en');

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.get('primeng').subscribe(value => this.primengConfig.setTranslation(value));
    });

    this.domain.succesTrackerDomainBehaviorSubject.subscribe(value => {
      this.translate.use(value.user.defaultLang);
    })
  }

  onLayoutClick() {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if (!this.configClick) {
      this.configDialogActive = false;
    }

    if (!this.menuClick) {
      if (this.isHorizontal()) {
        this.menuService.reset();
      }

      if (this.overlayMenuActive || this.overlayMenuMobileActive) {
        this.hideOverlayMenu();
      }

      this.menuHoverActive = false;
    }

    this.topbarItemClick = false;
    this.menuClick = false;
    this.configClick = false;
  }

  onMenuButtonClick(event: any) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.app.layoutMode === 'overlay' && !this.isMobile()) {
      this.overlayMenuActive = !this.overlayMenuActive;
    } else {
      if (!this.isDesktop()) {
        this.overlayMenuMobileActive = !this.overlayMenuMobileActive;
      }
    }

    event.preventDefault();
  }

  onMenuClick() {
    this.menuClick = true;
  }

  hideOverlayMenu() {
    this.overlayMenuActive = false;
    this.overlayMenuMobileActive = false;
  }

  isDesktop() {
    return window.innerWidth > 990;
  }

  isMobile() {
    return window.innerWidth <= 990;
  }

  isOverlay() {
    return this.app.layoutMode === 'overlay';
  }

  isHorizontal() {
    return this.app.layoutMode === 'horizontal';
  }
}
