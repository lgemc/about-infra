import { useContext, useEffect, useState } from "react";
import { ChatContext } from "./useChat";

function Message(params: { message: { id: string; content: string } }) {
  const { updateMessage, getMessage } = useContext(ChatContext);

  const message = getMessage({ id: params.message.id });

  var [messageContent, updateContent] = useState(params.message.content);

  useEffect(() => {
    updateContent(params.message.content);
  }, [message]);

  useEffect(() => {
    updateContent(params.message.content);
  }, [params.message.content]);
  return (
    <textarea
      onMouseLeave={() => {
        console.log("onMouseLeave");
        updateMessage({
          id: params.message.id,
          content: messageContent,
        });
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          console.log("onKeyDown");
          updateMessage({
            id: params.message.id,
            content: messageContent,
          });
        }
      }}
      onChange={(e) => {
        updateContent(e.currentTarget.value);
      }}
      value={messageContent}
    ></textarea>
  );
}

function MessageInput() {
  const { sendMessage } = useContext(ChatContext);
  return (
    <input
      type="text"
      placeholder="Press enter to send message"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage({ content: e.currentTarget.value });
          e.currentTarget.value = "";
        }
      }}
    />
  );
}

function Messages() {
  const { messages, deleteMessage } = useContext(ChatContext);
  return (
    <div>
      <li>
        {Object.values(messages).map((message) => (
          <div key={message.id}>
            <Message key={message.id} message={message} />
            <button
              onClick={() => {
                deleteMessage({ id: message.id });
              }}
            >
              X
            </button>
          </div>
        ))}
      </li>

      <MessageInput />
    </div>
  );
}

export default Messages;
