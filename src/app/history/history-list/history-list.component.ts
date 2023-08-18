import {Component} from '@angular/core';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {ChatHistoryService} from "../../services/chat-history.service";
import {Chat} from "../../domain/chat/chat";
import {SuccessChatService} from "../../services/success/success-chat.service";
import {TranslateService} from "@ngx-translate/core";
import {TimeFormatService} from "../../services/time-format.service";
import {EventType} from "../../domain/chat/event-type";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  providers: [ConfirmationService, MessageService]
})
export class HistoryListComponent {
  constructor(protected chatHistoryService: ChatHistoryService, private chatService: SuccessChatService, private messageService: MessageService, private confirmationService: ConfirmationService, private translate: TranslateService, private timeFormatService: TimeFormatService) {
    //empty constructor
  }

  OpenChat(chat: Chat) {
    this.chatService.openChat(chat);
  }

  removeChat(chat: Chat) {
    let deleteHistoryMessage = this.translate.instant('Are you sure you want to delete this chat history?');

    this.confirmationService.confirm({
      message: deleteHistoryMessage,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.chatHistoryService.removeChat(chat.chatDate);
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'You have accepted'});
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
            break;
        }
      }
    });
  }

  formatDate(date: Date) {
    let currentLang = this.translate.currentLang;
    return this.timeFormatService.formatDate(currentLang, 'EEEE, d MMMM', date);
  }

  toText(typeOfEvent: EventType[]) {
    return typeOfEvent.map(eventType => this.translate.instant(eventType.toString())).toString();
  }
}
