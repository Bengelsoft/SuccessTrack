export class User {
  private _name: string = "";
  private _defaultLang : string = 'en';

  get defaultLang(): string {
    return this._defaultLang;
  }

  set defaultLang(value: string) {
    this._defaultLang = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

}
