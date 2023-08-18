export interface MessageI {
  role: string;
  content: string;
}

export class Message implements MessageI {
  content: string;
  role: string;


  constructor(content: string, role: string) {
    this.content = content;
    this.role = role;
  }
}
