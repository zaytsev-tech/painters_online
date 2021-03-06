import Tool from "./tool";

export default class Brush extends Tool {
  mouseDown = false;
  constructor(canvas: any, socket: WebSocket, id: string) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
  }

  mouseUpHandler(e: MouseEvent) {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "finish",
        },
      })
    );
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true;
    this.ctx?.beginPath();
    this.ctx.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "brush",
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            strokeColor: this.ctx.fillStyle,
            lineWidth: this.ctx.lineWidth,
          },
        })
      );
    }
  }

  static staticDraw(
    ctx: any,
    x: number,
    y: number,
    strokeColor: string,
    lineWidth: number
  ) {
    ctx.lineTo(x, y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  draw(ctx: any, x: number, y: number, strokeColor: string, lineWidth: number) {
    this.ctx.lineTo(x, y);
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
  }
}
