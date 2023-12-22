export interface Message {
  id: string;
  content: string;
}

export type State = {
  messages: { [key: string]: Message };
  addMessage: (message: Message) => void;
  removeMessage: (messageId: string) => void;
  setMessage: (message: Message) => void;
};
