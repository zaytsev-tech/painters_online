import { WsCanvasMethodType } from "../index";

export function broadcastConnection(aWss: any, msg: WsCanvasMethodType) {
  aWss.clients.forEach((client: any) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
}
