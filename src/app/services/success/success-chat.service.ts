import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Message} from "../../domain/utility/aiMessage";
import {ChatCompletion} from "../../domain/success/chatCompletion";
import {ChatHistoryService} from "../chat-history.service";
import {Chat} from "../../domain/chat/chat";
import {SuccessCoachDialogService} from "./success-coach-dialog.service";
import {TranslateService} from "@ngx-translate/core";
import {OpenaiService} from "../openai.service";
import {SuccessChatPromptsService} from "./success-chat-prompts.service";
import {AiChatModel} from "../../domain/utility/aiChatModel";
import {EventType} from "../../domain/chat/event-type";

@Injectable({
  providedIn: 'root'
})
export class SuccessChatService {

  private dateId = new Date();
  private _loadFromOrCreate: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  private _conversation: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);


  get conversation(): BehaviorSubject<Message[]> {
    return this._conversation;
  }

  set conversation(value: BehaviorSubject<Message[]>) {
    this._conversation = value;
  }


  constructor(private chatHistoryService: ChatHistoryService, private successCoachDialogService: SuccessCoachDialogService, private translate: TranslateService, private openaiService: OpenaiService, private successChatPromptsService: SuccessChatPromptsService) {
    this.loadFromOrCreate.subscribe(value => {
      let chatHistory: Chat = chatHistoryService.getMessagesFromDateId(value);
      this.conversation.next(chatHistory.messages);
      this.dateId = chatHistory.chatDate;
    })
  }

  openChat(chat: any) {
    this.conversation.next(chat._messages);
    this.dateId = chat._chatDate;
    this.successCoachDialogService.showDialog = true;
  }

  get loadFromOrCreate(): BehaviorSubject<Date> {
    return this._loadFromOrCreate;
  }

  submitChat(): Observable<ChatCompletion> {
    let chatConversation = this.successChatPromptsService.getStartStructureChatConversation().concat(this.conversation.getValue())
    let requestBody: AiChatModel = this.successChatPromptsService.getAiChatModelWithMessages(chatConversation);
    return this.openaiService.chatConversation(requestBody);
  }

  add(message: Message) {
    this.chatHistoryService.addMessage(this.dateId, message, [EventType.CoachChatConversation])
    //alle berichten
    let messages: Message[] = this.conversation.getValue();
    messages.push(message);
    this.conversation.next(messages)
  }

  emptyChatConversation() {
    this.openChat(new Chat(new Date(), [], [EventType.CoachChatConversation]))
  }

  startNewSuccessConversation(firstname: string) {
    let startSentence = this.successChatPromptsService.conversationStarter;
    let startingSentenceInsertedFirstname = startSentence.replace(/{FIRSTNAME}/gi, firstname);

    this.add({
      "role": "assistant",
      "content": startingSentenceInsertedFirstname
    })
  }
}
