export class Settings {
  private _apiKey: string = "";
  private _autoSave: boolean = false;


  get apiKey(): string {
    return this._apiKey;
  }

  set apiKey(value: string) {
    this._apiKey = value;
  }

  get autoSave(): boolean {
    return this._autoSave;
  }

  set autoSave(value: boolean) {
    this._autoSave = value;
  }
}
