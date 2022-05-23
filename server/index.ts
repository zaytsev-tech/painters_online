import { broadcastConnection } from "./handlers/broadcast-connection";
import { broadcastMessages } from "./handlers/broadcast-messages";
import { connectionHandler } from "./handlers/connection-handler";

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

export type WsCanvasMethodType = {
  id: string;
  username: string;
  method: string;
};

export type WsMessageType = {
  event: string;
  id: number;
  username: string;
  text: string;
};

app.ws("/", (ws: any, req: any) => {
  ws.send("Connection established!");
  ws.on("message", (msg: any) => {
    const parsedMsg: WsCanvasMethodType = JSON.parse(msg);
    switch (parsedMsg.method) {
      case "connection":
        connectionHandler(ws, parsedMsg);
        broadcastConnection(aWss, parsedMsg);
        broadcastMessages(aWss, msg);
        break;
      case "message":
        broadcastMessages(aWss, msg);
        break;
      case "draw":
        broadcastConnection(aWss, parsedMsg);
        break;
    }
  });
});

app.post("/image", (req: any, res: any) => {
  try {
    const data = req.body.img.replace("data:image/png;base64,", "");
    fs.writeFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`),
      data,
      "base64"
    );
    return res.status(200).json({ message: "Is loaded" });
  } catch (error) {
    return res.status(500).json("error");
  }
});
app.get("/image", (req: any, res: any) => {
  try {
    const file = fs.readFileSync(
      path.resolve(__dirname, "files", `${req.query.id}.jpg`)
    );
    const data = "data:image/png;base64," + file.toString("base64");
    res.json(data);
  } catch (error) {
    return res.status(500).json("error");
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
