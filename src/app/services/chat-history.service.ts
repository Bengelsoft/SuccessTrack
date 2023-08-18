import {Injectable} from '@angular/core';
import {Chat} from "../domain/chat/chat";
import {DomainService} from "./domain.service";
import {Message} from "../domain/chat/message";
import {BehaviorSubject} from "rxjs";
import {EventType} from "../domain/chat/event-type";

@Injectable({
  providedIn: 'root'
})
export class ChatHistoryService {


  private _historyMessageList: BehaviorSubject<Chat[]> = new BehaviorSubject<Chat[]>([]);

  get historyMessageList(): BehaviorSubject<Chat[]> {
    return this._historyMessageList;
  }

  constructor(private domainService: DomainService) {
    this.domainService.succesTrackerDomainBehaviorSubject.subscribe(value => {
      this._historyMessageList.next(value.chats);
    })
  }

  getMessagesFromDateId(dateId: Date): Chat {
    let chats: Chat[] = this._historyMessageList.getValue().filter(value1 => value1.chatDate === dateId);
    if (chats.length > 0) {
      return chats[0];
    }
    return new Chat(new Date(), [], [])
  }


  addMessage(dateId: Date, message: Message, eventType : EventType[]) {
    const currentHistory = this._historyMessageList.getValue();
    let chatForDate = currentHistory.filter(chat => chat.chatDate === dateId);

    if (!chatForDate.length) {
      chatForDate = [new Chat(dateId, [message], eventType)];
      currentHistory.push(...chatForDate);
    } else {
      chatForDate.forEach(chat => chat.messages.push(message));
    }

    const succesTracker = this.domainService.succesTrackerDomainBehaviorSubject.getValue();
    succesTracker.chats = currentHistory;
    this.domainService.succesTrackerDomainBehaviorSubject.next(succesTracker);
  }

  removeChat(chatDate: Date) {
    let succesTracker = this.domainService.succesTrackerDomainBehaviorSubject.getValue();
    succesTracker.chats = succesTracker.chats.filter(value => value.chatDate != chatDate);
    this.domainService.succesTrackerDomainBehaviorSubject.next(succesTracker);
  }
}
