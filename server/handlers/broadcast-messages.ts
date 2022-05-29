import { WsMessageType } from "../index";

export function broadcastMessages(aWss: any, msg: WsMessageType) {
  console.log("msg stringify", JSON.stringify(msg));

  aWss.clients.forEach((client: any) => client.send(msg));
}
