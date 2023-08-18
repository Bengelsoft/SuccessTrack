import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppMainComponent} from "./app.main.component";
import {SettingsComponent} from "./settings/settings.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import {HistoryComponent} from "./history/history.component";
import {PromptsComponent} from "./prompts/prompts.component";
import {SuccessComponent} from "./success/success.component";

const routes: Routes = [
  {
    path: '', component: AppMainComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'success', component: SuccessComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'prompts', component: PromptsComponent},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
