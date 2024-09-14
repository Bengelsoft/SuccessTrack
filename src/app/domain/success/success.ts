import {ElementOfSuccess} from "./element-of-success";

export class Success {

  private _dateOfSucces: Date;
  private _successDescription: string;
  private _id: number;
  private _elementsOfSuccessCodes: string[];


  constructor(date: Date, success: string, elementsOfSucces: string[]) {
    this._dateOfSucces = date;
    this._successDescription = success;
    this._elementsOfSuccessCodes = elementsOfSucces;
    this._id = new Date().getTime() + Math.floor(Math.random() * 1000);
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get dateOfSucces(): Date {
    return this._dateOfSucces;
  }

  set dateOfSucces(value: Date) {
    this._dateOfSucces = value;
  }

  get successDescription(): string {
    return this._successDescription;
  }

  set successDescription(value: string) {
    this._successDescription = value;
  }

  get elementsOfSuccessCodes(): string[] {
    return this._elementsOfSuccessCodes;
  }

  set elementsOfSuccessCodes(value: string[]) {
    this._elementsOfSuccessCodes = value;
  }
}
