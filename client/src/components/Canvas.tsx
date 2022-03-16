import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/canvas.scss";
import Brush from "../tools/Brush";

const Canvas: FC = observer(() => {
  const params = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const userInputRef: any = useRef(null);
  const [modal, setModal] = useState(true);

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
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

  const drawHandler = (msg: any) => {};

  const mouseDownHandler = () => {
    canvasRef?.current?.toDataURL() &&
      canvasState.pushToUndo(canvasRef.current.toDataURL());
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
        ref={canvasRef}
        height={400}
        width={600}
      />
    </div>
  );
});

export default Canvas;
