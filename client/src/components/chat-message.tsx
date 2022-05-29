import { FC } from "react";
import "../styles/chat.scss";

export interface ChatMessageProps {
  username: string;
  text: string;
}

export const ChatMessage: FC<ChatMessageProps> = ({ username, text }) => {
  return (
    <div className="chat_message_item">
      <span className="username_chat_message">{username}</span>
      <p>{text}</p>
    </div>
  );
};
