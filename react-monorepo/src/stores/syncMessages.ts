import socketIO from "@atelier/shared/socket.io";
import { useEffect } from "react";
import { Message, State } from "./types";

export default function syncMessages(store: State) {
  useEffect(() => {
    socketIO.on<Message>("/messages", (m) => {
      if (m.new_val) {
        if (!m.old_val) {
          store.addMessage(m.new_val);
          return;
        }

        store.setMessage(m.new_val);

        return;
      }

      if (!m.old_val) {
        return;
      }

      store.removeMessage(m.old_val.id);
    });
  }, []);
}
