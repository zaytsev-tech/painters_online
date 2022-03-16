import { broadcastConnection } from "./handlers/broadcast-connection";
import { connectionHandler } from "./handlers/connection-handler";

const express = require("express");
const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();

const PORT = process.env.PORT || 5000;

export type WsMessageType = {
  id: string;
  username: string;
  method: string;
};

app.ws("/", (ws: any, req: any) => {
  ws.send("Connection established!");
  ws.on("message", (msg: any) => {
    const parsedMsg: WsMessageType = JSON.parse(msg);
    switch (parsedMsg.method) {
      case "connection":
        connectionHandler(ws, parsedMsg);
        broadcastConnection(aWss, parsedMsg);
        break;
      case "draw":
        broadcastConnection(aWss, parsedMsg);
        break;
    }
  });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
