import {Injectable} from '@angular/core';
import {Success} from "../domain/success/success";
import {SuccessTracker} from "../domain/successTracker";
import {BehaviorSubject} from "rxjs";
import {User} from "../domain/success/user";
import {Settings} from "../domain/settings";
import {plainToClass, plainToInstance} from 'class-transformer';
import {Chat} from "../domain/chat/chat";
import {EventType} from "../domain/chat/event-type";

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  get succesTrackerDomainBehaviorSubject(): BehaviorSubject<SuccessTracker> {
    return this._succesTrackerDomainBehaviorSubject;
  }

  //init
  private succesTrackerDomain: SuccessTracker = new SuccessTracker(3);
  private _succesTrackerDomainBehaviorSubject: BehaviorSubject<SuccessTracker> = new BehaviorSubject<SuccessTracker>(this.succesTrackerDomain);

  importModel(model: string) {
    const parseModel = JSON.parse(model);

    let compatibleParseModel = this.makeItCompatibleWithDomain(parseModel);
    this.succesTrackerDomainBehaviorSubject.next(this.mapOnDomain(parseModel));


  }

  // @ts-ignore
  makeItCompatibleWithDomain(parseModel: any) {
    let currentVersion = this.succesTrackerDomain.version;
    if (parseModel._version === currentVersion) {
      return parseModel;
    }

    if (parseModel._version === 1) {
      this.updateV1ToV2(parseModel);
      console.log("Convert to version 2");
      return this.makeItCompatibleWithDomain(parseModel);
    }
    if (parseModel._version === 2) {
      this.updateV2ToV3(parseModel);
      console.log("Convert to version 3");
      return this.makeItCompatibleWithDomain(parseModel);
    } else {
      console.log("Error, version not compatible!")
    }
  }


  mapOnDomain(parseModel: any): SuccessTracker {
    let succesTracker = new SuccessTracker(parseModel._version);
    succesTracker.user = plainToClass(User, parseModel._user);
    succesTracker.settings = plainToClass(Settings, parseModel._settings);

    let successes: Success[] = plainToInstance(Success, parseModel._successes);
    succesTracker.successes = this.fixedDate(successes);

    succesTracker.chats = parseModel._chats;
    let chats: Chat[] = plainToInstance(Chat, parseModel._chats);
    succesTracker.chats = this.fixedDateHistory(chats);

    return succesTracker;
  }

  updateV1ToV2(parseModel: any) {
    //convert the _elementsOfSucces to elementsOfSuccessCodes
    parseModel._successes.forEach(convertSuccess);
    parseModel._version = 2;
    return parseModel;

    function convertSuccess(success: any) {
      let newElementsOfSuccessCodes: string[] = []
      success._elementsOfSuccess.forEach(function (elementOfSuccess: any) {
        newElementsOfSuccessCodes.push(elementOfSuccess._code);
      })
      success._elementsOfSuccessCodes = newElementsOfSuccessCodes;
      delete success._elementsOfSuccess;
    }
  }

  updateV2ToV3(parseModel: any) {
    //add for the chats the EventType 'CoachChatConversation';

    // @ts-ignore
    parseModel._chats.map((chat) => {
      chat._typeOfEvent = [EventType.CoachChatConversation];
    })
    parseModel._version = 3;
    return parseModel;
  }

  fixedDate(successes: Success[]): Success[] {
    successes.forEach(value => value.dateOfSucces = new Date(value.dateOfSucces));
    return successes;
  }

  fixedDateHistory(chats: Chat[]): Chat[] {
    chats.forEach(value => {
      value.chatDate = new Date(value.chatDate)
    });
    return chats;
  }
}
