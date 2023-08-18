import {Component} from '@angular/core';
import {SuccessService} from "../../../services/success/success.service";
import {SuccessChatService} from "../../../services/success/success-chat.service";
import {SuccessCreateService} from "../../../services/success/success-create.service";
import {OpenaiService} from "../../../services/openai.service";
import {SuccessCoachDialogService} from "../../../services/success/success-coach-dialog.service";
import {Message} from "../../../domain/utility/aiMessage";
import {Success} from "../../../domain/success/success";
import {SuccessChatPromptsService} from "../../../services/success/success-chat-prompts.service";

@Component({
  selector: 'app-chat-success',
  templateUrl: './chat-success.component.html',
  styleUrls: ['./chat-success.component.scss']
})
export class ChatSuccessComponent {

  // @ts-ignore
  value: string;

  display: boolean = false;

  progress: boolean = false;

  constructor(public succesService: SuccessService, public chatService: SuccessChatService, private succesCreateService: SuccessCreateService, private aiCompleteService: OpenaiService, private successChatPromptsService: SuccessChatPromptsService, private successCoachDialogService: SuccessCoachDialogService) {

  }

  autoScrollToBottom() {
    const element = document.getElementById("chat");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  sendMessage() {
    this.progress = true;
    this.chatService.add(new Message("user", this.value));
    this.autoScrollToBottom()
    this.chatService.submitChat().subscribe(value1 => {
      this.chatService.add(value1.choices[0].message);
      this.autoScrollToBottom();
      this.progress = false;
    });
    this.value = '';
  }

  createResume() {
    //show dialog progressbar
    this.succesCreateService.showDialog = true;
    this.succesCreateService.showProgress = true;

    //filter start chat conversation message (not relevant data)
    let messages = this.chatService.conversation.getValue().filter((element, index) => index != 0);

    // create request body
    let requestBody = this.successChatPromptsService.getFunctionCallGetSuccessPrompt(this.succesService.elementsOfSuccess, messages);
    this.aiCompleteService.getCompleteGPTResponseFunction(requestBody)
      .subscribe(response => {
        console.log(response);
        this.successCoachDialogService.closeDialog();
        // extract the successes from the openai analysis;
        let callFunctionResponse: string = response.choices[0].message.function_call.arguments;
        let responseSuccesses: {
          success: string;
          elementsOfSuccessCodes: string[]
        }[] = JSON.parse(callFunctionResponse).successes

        let succesList = responseSuccesses.map(successElement =>
          new Success(new Date(), successElement.success, successElement.elementsOfSuccessCodes)
        );

        //add successes.
        this.succesCreateService.addSuccessToDialog(succesList);
        this.succesCreateService.showProgress = false;
      });
  }
}
