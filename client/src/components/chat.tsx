import { FC } from "react";
import "../styles/chat.scss";
import { ChatMessage } from "./chat-message";

export const ChatComponent: FC = () => {
  return (
    <div className="chat">
      <div className="chat_container">
        <ChatMessage username="User" text="Test text message from user!" />
        <div className="chat_bottom_input">
          <textarea></textarea>
          <button className="chat_bottom__button">Send</button>
        </div>
      </div>
    </div>
  );
};
