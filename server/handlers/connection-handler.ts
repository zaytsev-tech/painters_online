import { WsMessageType } from "../index";
import { broadcastConnection } from "./broadcast-connection";

export function connectionHandler(ws: any, msg: WsMessageType) {
  ws.id = msg.id;
}
