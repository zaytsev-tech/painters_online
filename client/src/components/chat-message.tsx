import { FC } from "react";
import canvasState from "../store/canvas-state";
import "../styles/chat.scss";

export interface ChatMessageProps {
  username: string;
  text: string;
}

export const ChatMessage: FC<ChatMessageProps> = ({ username, text }) => {
  const currentUsername = username === canvasState.username;

  return (
    <div
      className={
        currentUsername ? "chat_currentuser_message_item" : "chat_message_item"
      }
    >
      <span className="username_chat_message">{username}</span>
      <p>{text}</p>
    </div>
  );
};
