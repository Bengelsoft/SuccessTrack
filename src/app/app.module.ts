import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TableModule} from 'primeng/table';
import {ToastModule} from "primeng/toast";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {FileUploadModule} from "primeng/fileupload";
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import {TagModule} from "primeng/tag";
import {DialogModule} from "primeng/dialog";
import {TabMenuModule} from "primeng/tabmenu";
import {SpeedDialModule} from "primeng/speeddial";
import {CardModule} from "primeng/card";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SettingsComponent} from './settings/settings.component';
import {ToolbarModule} from "primeng/toolbar";
import {TopbarComponent} from './layout/topbar/topbar.component';
import {ActionbarComponent} from './layout/actionbar/actionbar.component';
import {FooterComponent} from './layout/footer/footer.component';
import {MenuService} from "./layout/menu/service/app.menu.service";
import {AppMainComponent} from "./app.main.component";
import {BreadcrumbService} from "./app.breadcrumb.service";
import {MenuComponent} from './layout/menu/menu.component';
import {RippleModule} from "primeng/ripple";
import {MenuitemComponent} from "./layout/menu/menuitem.component";
import {ListboxModule} from "primeng/listbox";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {SliderModule} from "primeng/slider";
import {ChartModule} from "primeng/chart";
import {HistoryComponent} from './history/history.component';
import {HistoryListComponent} from './history/history-list/history-list.component';
import {PasswordModule} from "primeng/password";
import {InputSwitchModule} from "primeng/inputswitch";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {SplitButtonModule} from "primeng/splitbutton";
import {CheckboxModule} from "primeng/checkbox";
import {FullCalendarModule} from "@fullcalendar/angular";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TreeTableModule} from 'primeng/treetable';
import {TreeModule} from "primeng/tree";
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import {PromptsComponent} from './prompts/prompts.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {DropdownModule} from "primeng/dropdown";
import { SuccessComponent } from './success/success.component';
import { ActionbarSuccessComponent } from './success/actionbar-success/actionbar-success.component';
import { CreateSuccessComponent } from './success/create-dialog-success/create-success/create-success.component';
import { ListSuccessComponent } from './success/list-success/list-success.component';
import { CreateDialogSuccessComponent } from './success/create-dialog-success/create-dialog-success.component';
import { ChatSuccessComponent } from './success/coach-chat-success/chat-success/chat-success.component';
import { CoachChatDialogSuccessComponent } from './success/coach-chat-success/coach-chat-dialog-success.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    TopbarComponent,
    ActionbarComponent,
    FooterComponent,
    AppMainComponent,
    MenuComponent,
    MenuitemComponent,
    DashboardComponent,
    ProfileComponent,
    HistoryComponent,
    HistoryListComponent,
    PromptsComponent,
    SuccessComponent,
    ActionbarSuccessComponent,
    CreateSuccessComponent,
    ListSuccessComponent,
    CreateDialogSuccessComponent,
    ChatSuccessComponent,
    CoachChatDialogSuccessComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    ToastModule,
    FormsModule,
    ButtonModule,
    FileUploadModule,
    CalendarModule,
    MultiSelectModule,
    TagModule,
    DialogModule,
    TabMenuModule,
    SpeedDialModule,
    CardModule,
    InputTextareaModule,
    ToolbarModule,
    RippleModule,
    ListboxModule,
    InputTextModule,
    SliderModule,
    ChartModule,
    PasswordModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    SplitButtonModule,
    CheckboxModule,
    FullCalendarModule,
    ConfirmDialogModule,
    TreeTableModule,
    TreeModule,
    AvatarModule,
    BadgeModule,
    AutoCompleteModule,
    DropdownModule
  ],
  providers: [MenuService, BreadcrumbService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
