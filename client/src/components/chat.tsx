import { FC } from "react";
import canvasState from "../store/canvas-state";
import "../styles/chat.scss";
import { ChatMessage } from "./chat-message";

interface ChatComponentProps {
  messages: Array<any>;
  socket: WebSocket;
}

export const ChatComponent: FC<ChatComponentProps> = ({ messages, socket }) => {
  return (
    <div className="chat">
      <div className="chat_container">
        {messages.map((message) => (
          <ChatMessage username={message.username} text={message.text} />
        ))}
        <div className="chat_bottom_input">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const textareaContent = document.getElementById(
                "textareaMessage"
              ) as HTMLInputElement;
              socket.send(
                JSON.stringify({
                  id: new Date().getMilliseconds().toString(),
                  method: "message",
                  username: canvasState.username,
                  text: textareaContent.value,
                })
              );
            }}
          >
            <textarea id="textareaMessage"></textarea>
            <button className="chat_bottom__button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
