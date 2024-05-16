import {Injectable} from '@angular/core';
import {AiMessage} from "../../domain/utility/aiMessage";
import {AiChatModel} from "../../domain/utility/aiChatModel";
import {TranslateService} from "@ngx-translate/core";
import {ElementOfSuccess} from "../../domain/success/element-of-success";

@Injectable({
  providedIn: 'root'
})
export class SuccessChatPromptsService {
  private _conversationStarter: string = this.translate.instant("Hi {FIRSTNAME}, what did you do today?");

  constructor(private translate: TranslateService) {
  }

  successChatPrompt: AiChatModel = {
    "model": "gpt-4o",
    "messages": [],
    "temperature": 1,
    "max_tokens": 256,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0
  }


  get commandToAI(): string {
    return this.translate.instant(this._commandToAI);
  }

  set commandToAI(value: string) {
    this._commandToAI = value;
  }

  private _commandToAI: string = this.translate.instant("You are a coach, and assistant and help write successes. A success consists of one of the 5 elements:\n" +
    "Achieved (desired) result\n" +
    "To come in action\n" +
    "gain insight(aha)\n" +
    "Recognize or acknowledge the mistake\n" +
    "New understanding (something learned)\n" +
    "\n" +
    "By asking about today's activities you help define and write out successes.\n" +
    "Only ask one question at a time");

  private startStructureChatConversation: AiMessage[] = [
    {
      "role": "system",
      "content": "{COMMAND_TO_AI}"
    }
  ];

  getStartStructureChatConversation(): AiMessage[] {
    let structureModel: AiMessage[] = JSON.parse(JSON.stringify(this.startStructureChatConversation));
    if (structureModel.length > 0) {
      structureModel[0].content = this.translate.instant(this._commandToAI);
    }
    return structureModel;
  }

  getAiChatModelWithMessages(messages: AiMessage[]) {
    let copySuccessChatPrompt: AiChatModel = JSON.parse(JSON.stringify(this.successChatPrompt));
    copySuccessChatPrompt.messages = messages;
    return copySuccessChatPrompt;
  }

  get conversationStarter(): string {
    return this.translate.instant(this._conversationStarter);
  }

  set conversationStarter(value: string) {
    this._conversationStarter = value;
  }


  get descriptionArrayObjectSuccess(): string {
    return this.translate.instant(this._descriptionArrayObjectSuccess);
  }

  set descriptionArrayObjectSuccess(value: string) {
    this._descriptionArrayObjectSuccess = value;
  }

  get listOfSuccessCodesDerivedFromTheSuccessDescription(): string {
    return this.translate.instant(this._listOfSuccessCodesDerivedFromTheSuccessDescription);
  }

  set listOfSuccessCodesDerivedFromTheSuccessDescription(value: string) {
    this._listOfSuccessCodesDerivedFromTheSuccessDescription = value;
  }

  get descriptionOfTheTextSuccessDescriptionInTheSuccessObject(): string {
    return this.translate.instant(this._descriptionOfTheTextSuccessDescriptionInTheSuccessObject);
  }

  set descriptionOfTheTextSuccessDescriptionInTheSuccessObject(value: string) {
    this._descriptionOfTheTextSuccessDescriptionInTheSuccessObject = value;
  }

  get descriptionOfGetSuccessenMethod(): string {
    return this.translate.instant(this._descriptionOfGetSuccessenMethod);
  }

  set descriptionOfGetSuccessenMethod(value: string) {
    this._descriptionOfGetSuccessenMethod = value;
  }

  private _descriptionArrayObjectSuccess: string = this.translate.instant("A list of successes");
  private _listOfSuccessCodesDerivedFromTheSuccessDescription: string = this.translate.instant("Each enum is a code associated with an 'elementOfSuccess', list the 'elementCodes', a success contains one or more success elements:");
  private _descriptionOfTheTextSuccessDescriptionInTheSuccessObject: string = this.translate.instant("The success in the I-form, use the pronoun I");
  private _descriptionOfGetSuccessenMethod: string = this.translate.instant("Give all the successes from this conversation.");


  public promptFunctionCallCreateSuccessesFromMessages: any = {
    "model": "gpt-4o",
    "temperature": 1.0,
    "max_tokens": 750,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0.6,
    "messages": [],
    "function_call": {
      "name": "get_successen"
    },
    "functions": [{
      "name": "get_successen",
      "description": "{FUNCTION_DESCRIPTION_GET_SUCCESSEN_FROM_CHAT}",
      "parameters": {
        "type": "object",
        "required": [
          "success",
          "elementsOfSuccessCodes"],
        "properties": {
          "successes": {
            "type": "array",
            "description": "{ARRAY_OBJECT_SUCCESSES_DESCRIPTION}",
            "items": {
              "type": "object",
              "required": ["success", "elementsOfSuccessCodes"],
              "properties": {
                "success": {
                  "type": "string",
                  "description": "{DESCRIPTION_OF_THE_TEXT_SUCCESS_DESCRIPTION}",
                },
                "elementsOfSuccessCodes": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "description": "{LIST_OF_SUCCESS_CODES_DERIVED_FROM_THE_SUCCESS_DESCIRPTION} {THE_ELEMENTS_OF_SUCCESS_WRITTEN_OUT}",
                    "enum": ['{LIST_OF_ENUM_SUCCESSCODES}']
                  }
                }
              }
            }
          }
        }
      }
    }]
  }


  getFunctionCallGetSuccessPrompt(elementOfSuccess: ElementOfSuccess[], messages: AiMessage[]): any {
    const successCodes = elementOfSuccess.map(value => value.code);
    const elementsSuccessWrittenOut = elementOfSuccess.map(value => value._name + ' (' + value._code + ')').toString();
    const prompt = {...this.promptFunctionCallCreateSuccessesFromMessages};
    prompt.messages = messages;
    let promptStringify = JSON.stringify(prompt);
    promptStringify = promptStringify.replace(/{FUNCTION_DESCRIPTION_GET_SUCCESSEN_FROM_CHAT}/gi, this._descriptionOfGetSuccessenMethod)
      .replace(/{ARRAY_OBJECT_SUCCESSES_DESCRIPTION}/gi, this._descriptionArrayObjectSuccess)
      .replace(/{DESCRIPTION_OF_THE_TEXT_SUCCESS_DESCRIPTION}/gi, this._descriptionOfTheTextSuccessDescriptionInTheSuccessObject)
      .replace(/{LIST_OF_ENUM_SUCCESSCODES}/gi, successCodes.toString())
      .replace(/{LIST_OF_SUCCESS_CODES_DERIVED_FROM_THE_SUCCESS_DESCIRPTION}/gi, this._listOfSuccessCodesDerivedFromTheSuccessDescription)
      .replace(/{THE_ELEMENTS_OF_SUCCESS_WRITTEN_OUT}/gi, elementsSuccessWrittenOut);
    return promptStringify;
  }
}
