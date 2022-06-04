import { WsMessageType } from "../index";

export function broadcastMessages(aWss: any, msg: WsMessageType) {
  aWss.clients.forEach((client: any) => client.send(msg));
}
