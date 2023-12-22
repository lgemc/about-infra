import Messages from "./Messages";
import $useChat, { ChatContext } from "./useChat";
function App() {
  return (
    // @ts-ignore
    <ChatContext.Provider value={$useChat()}>
      <Messages></Messages>
    </ChatContext.Provider>
  );
}

export default App;
