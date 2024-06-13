import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {SettingsService} from "./settings.service";
import {AiChatModel} from "../domain/utility/aiChatModel";
import {ElementOfSuccess} from "../domain/success/element-of-success";

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  constructor(private http: HttpClient, private settingsService: SettingsService) {
  }

  chatConversation(chatBody: AiChatModel) : Observable<any> {
    const url = 'https://api.openai.com/v1/chat/completions';
    const body = JSON.stringify(chatBody)
    return this.postData(url, body);
  }

  getCompleteGPTResponseFunction(prompt: string): Observable<any> {
    const url = 'https://api.openai.com/v1/chat/completions';
    return this.postData(url, prompt);
  }


  postData(url: string, body: any): Observable<any> {
    // Specifieke headers instellen
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.settingsService.getOpenAiApiKey());

    // POST-verzoek uitvoeren met de opgegeven URL, body en headers
    return this.http.post(url, body, {headers: headers});
  }
}
