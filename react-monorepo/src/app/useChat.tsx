import React, { useEffect } from "react";
import store from "@atelier/stores";
import syncMessages from "@atelier/stores/syncMessages";
import messagesAPI from "@atelier/shared/api/messages";
import { Background } from "@atelier/core/context";
import { Message } from "@atelier/stores/types";

export const ChatContext = React.createContext({
  messages: Array<Message>(),
  sendMessage(payload: { content: string; from?: string }) {},
  deleteMessage(payload: { id: string }) {},
  updateMessage(payload: { id: string; content: string }) {},
  getMessage(payload: { id: string }) {},
});

export default function useChat() {
  const $store = store.useStore();

  syncMessages($store);

  useEffect(() => {
    const fetchMessages = async () => {
      const result = await messagesAPI.list(Background());
      if (result.isErr()) {
        console.log(result.error);

        return;
      }

      for (const message of result.value.items) {
        $store.addMessage(message);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async (payload: { content: string; from?: string }) => {
    const result = await messagesAPI.create(Background(), {
      content: payload.content,
      from: payload.from,
    });

    if (result.isErr()) {
      console.log(result.error);

      return;
    }

    $store.addMessage(result.value);
  };

  const deleteMessage = async (payload: { id: string }) => {
    const result = await messagesAPI.delete(Background(), {
      message_id: payload.id,
    });

    if (result.isErr()) {
      console.log(result.error);

      return;
    }

    $store.removeMessage(payload.id);
  };

  const updateMessage = async (payload: { id: string; content: string }) => {
    const result = await messagesAPI.update(Background(), {
      message_id: payload.id,
      content: payload.content,
    });

    if (result.isErr()) {
      console.log(result.error);

      return;
    }

    $store.setMessage({ id: payload.id, content: payload.content });
  };

  return {
    messages: store.getters.messages(),
    getMessage: store.getters.getMessage,
    sendMessage,
    deleteMessage,
    updateMessage,
  };
}
