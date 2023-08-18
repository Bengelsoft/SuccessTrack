import {Component, OnInit} from '@angular/core';
import {SuccessChatPromptsService} from "../services/success/success-chat-prompts.service";

@Component({
  selector: 'app-prompts',
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.scss']
})
export class PromptsComponent implements OnInit {

  constructor(public promptsService: SuccessChatPromptsService) {
    //empty constructor
  }

  ngOnInit(): void {

  }

  changePromptFunctionCallCreateSuccessesFromMessages($event: string) {
    this.promptsService.promptFunctionCallCreateSuccessesFromMessages = JSON.parse($event);
  }

  changeSuccessChatPrompt($event: string) {
    this.promptsService.successChatPrompt = JSON.parse($event);
  }
}
