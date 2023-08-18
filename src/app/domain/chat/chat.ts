import {Message} from "./message";
import {EventType} from "./event-type";

export class Chat {

  private _chatDate: Date = new Date();
  private _messages: Message[] = [];
  private _typeOfEvent : EventType[] = [];

  constructor(date: Date, messages: Message[], eventType: EventType[]) {
    this.typeOfEvent = eventType;
    this.messages = messages;
    this.chatDate = date;
  }

  get typeOfEvent(): EventType[] {
    return this._typeOfEvent;
  }

  set typeOfEvent(value: EventType[]) {
    this._typeOfEvent = value;
  }
  get chatDate(): Date {
    return this._chatDate;
  }

  set chatDate(value: Date) {
    this._chatDate = value;
  }

  get messages(): Message[] {
    return this._messages;
  }

  set messages(value: Message[]) {
    this._messages = value;
  }
}
