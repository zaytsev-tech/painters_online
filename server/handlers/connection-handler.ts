import { WsCanvasMethodType } from "../index";

export function connectionHandler(ws: any, msg: WsCanvasMethodType) {
  ws.id = msg.id;
}
