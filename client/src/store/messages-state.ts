import { makeAutoObservable } from "mobx";

export interface MessageProps {
  id: string;
  method: string;
  username: string;
  text: string;
}

export interface MainMessageProps {
  username: string;
  text: string;
}

class MessagesState {
  messages: MessageProps[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  getMessages() {
    return this.messages;
  }

  addMessage(message: MainMessageProps) {
    const normalizedMessage = {
      ...message,
      method: "message",
      id: new Date().getMilliseconds().toString(),
    };
    this.messages.push(normalizedMessage);
  }
}

export default new MessagesState();
