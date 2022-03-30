import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import canvasState from "../store/canvas-state";
import toolState from "../store/tool-state";
import "../styles/canvas.scss";
import Brush from "../tools/brush";
import Rect from "../tools/rect";
import axios from "axios";

const Canvas: FC = observer(() => {
  const params = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const userInputRef: any = useRef(null);
  const [modal, setModal] = useState(true);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    const ctx = canvasRef.current?.getContext("2d");
    axios
      .get(`http://localhost:5000/image?id=${params.id}`)
      .then((response) => {
        const image = new Image();
        image.src = response.data;
        image.onload = () => {
          if (canvasRef.current && ctx) {
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            ctx.drawImage(
              image,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            ctx.stroke();
          }
        };
      });
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("ws://localhost:5000/");
      canvasState.setSocket(socket);
      params.id && canvasState.setSessionId(params.id);
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: "connection",
          })
        );
      };

      toolState.setTool(new Brush(canvasRef.current, socket, params.id || ""));

      socket.onmessage = (event: MessageEvent) => {
        const msg = JSON.parse(event.data);
        switch (msg.method) {
          case "connection":
            console.log(`user ${msg.username} is connected`);
            break;
          case "draw":
            drawHandler(msg);
            break;
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg: any) => {
    const figure = msg.figure;
    const ctx = canvasRef.current?.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
        break;
      case "rect":
        Rect.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.color
        );
        break;
      case "finish":
        ctx?.beginPath();
        break;
    }
  };

  const mouseDownHandler = () => {
    canvasRef?.current?.toDataURL() &&
      canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const mouseUpHandler = () => {
    axios
      .post(`http://localhost:5000/image?id=${params.id}`, {
        img: canvasRef.current?.toDataURL(),
      })
      .then((response) => response.data);
  };

  const connectHandler = () => {
    const username = userInputRef.current.value;
    canvasState.setUsername(username);
    setModal(false);
  };

  return (
    <div className="canvas">
      <Modal
        show={modal}
        onHide={() => {
          setModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter your name</Modal.Title>
        </Modal.Header>
        <div>
          <input type="text" ref={userInputRef} />
        </div>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              connectHandler();
            }}
          >
            Enter
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        ref={canvasRef}
        height={400}
        width={600}
      />
    </div>
  );
});

export default Canvas;
