import { create } from "zustand";
import { produce } from "immer";
import { State, Message } from "./types";

const useStore = create<State>()((set) => ({
  messages: {},
  addMessage: (message: Message) => {
    set(
      produce((state: State) => {
        state.messages[message.id] = message;
      })
    );
  },
  removeMessage: (messageId: string) => {
    set(
      produce((state: State) => {
        delete state.messages[messageId];
      })
    );
  },
  setMessage: (message: Message) => {
    set(
      produce((state: State) => {
        state.messages[message.id] = message;
      })
    );
  },
}));

const messages = () => {
  return useStore.getState().messages;
};

const getMessage = (messageId: string) => {
  return useStore.getState().messages[messageId];
};

const store = {
  useStore,
  getters: {
    messages,
    getMessage,
  },
};

export default store;
