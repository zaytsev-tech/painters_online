import { FC, FormEvent, useEffect, useRef } from "react";
import canvasState from "../store/canvas-state";
import "../styles/chat.scss";
import { ChatMessage } from "./chat-message";

interface ChatComponentProps {
  messages: Array<any>;
  socket: WebSocket;
}

export const ChatComponent: FC<ChatComponentProps> = ({ messages, socket }) => {
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textareaContent = document.getElementById(
      "textareaMessage"
    ) as HTMLInputElement;

    if (!textareaContent.value) return;

    const formattedMessage = {
      id: new Date().getMilliseconds().toString(),
      method: "message",
      username: canvasState.username,
      text: textareaContent.value,
    };
    socket.send(JSON.stringify(formattedMessage));
    textareaContent.value = "";
  };

  useEffect(() => {
    chatListRef.current!.scrollTop = chatListRef.current!.scrollHeight;
  }, [messages.length]);

  return (
    <div className="chat">
      <div className="chat__container">
        <div className="chat_messages__list" ref={chatListRef}>
          {messages.map((message) => (
            <ChatMessage username={message.username} text={message.text} />
          ))}
        </div>
        <div className="chat_bottom__input">
          <form onSubmit={handleSubmit}>
            <textarea
              id="textareaMessage"
              className="chat_bottom__textarea"
            ></textarea>
            <button className="chat_bottom__button" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
