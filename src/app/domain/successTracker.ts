import {Settings} from "./settings";
import {Success} from "./success/success";
import {User} from "./success/user";
import {Chat} from "./chat/chat";

export interface SuccessTrackerI {
  settings: Settings;
  successes: Success[];
  version: number;
  user: User;
  chats: Chat[];
}


export class SuccessTracker implements SuccessTrackerI{
  private _settings: Settings = new Settings();
  private _successes: Success[] = [];
  private _version: number = 0;
  private _user: User = new User();
  private _chats: Chat[] = [];

  get chats(): Chat[] {
    return this._chats;
  }

  set chats(value: Chat[]) {
    this._chats = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  set settings(value: Settings) {
    this._settings = value;
  }

  set successes(value: Success[]) {
    this._successes = value;
  }

  set version(value: number) {
    this._version = value;
  }


  get settings(): Settings {
    return this._settings;
  }

  get successes(): Success[] {
    return this._successes;
  }

  get version(): number {
    return this._version;
  }

  constructor(version: number) {
    this._version = version;
  }


}
