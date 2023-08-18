import {Component} from '@angular/core';
import {SuccessCoachDialogService} from "../../services/success/success-coach-dialog.service";
import {SuccessCreateService} from "../../services/success/success-create.service";
import {SettingsService} from "../../services/settings.service";
import {SuccessChatService} from "../../services/success/success-chat.service";
import {DomainService} from "../../services/domain.service";

@Component({
  selector: 'app-actionbar-success',
  templateUrl: './actionbar-success.component.html'
})
export class ActionbarSuccessComponent {


  constructor(private succesCoachService: SuccessCoachDialogService, private succesCreateService: SuccessCreateService, private settingsService: SettingsService, private chatService: SuccessChatService, private domainService: DomainService) {
    //empty constructor
  }

  showCreateSuccesDialog() {
    this.succesCreateService.showDialog = true;
  }

  showCoachDialogSucces() {
    this.chatService.emptyChatConversation();
    this.chatService.startNewSuccessConversation(this.domainService.succesTrackerDomainBehaviorSubject.getValue().user.name);
  }

  isApiKeyPresent(): boolean {
    return this.settingsService.isApiKeyPresent()
  }
}
