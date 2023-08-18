export interface AiMessage {
  role: string;
  content: string;
}
export class Message implements AiMessage{
  constructor(public role: string, public content: string) {}
}
