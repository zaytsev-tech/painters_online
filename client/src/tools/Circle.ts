import Tool from "./tool";

export default class Circle extends Tool {
  mouseDown = false;
  saved = "";
  startX = 0;
  startY = 0;
  width = 0;
  height = 0;

  constructor(canvas: any) {
    super(canvas);
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
          type: "circle",
          x: this.startX,
          y: this.startY,
          w: this.width,
          h: this.height,
        },
      })
    );
  }

  mouseDownHandler(e: any) {
    this.mouseDown = true;
    this.ctx?.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  static staticDraw(ctx: any, x: number, y: number, w: number, h: number) {
    ctx.beginPath();
    w = w < 0 ? -w : w;
    ctx.ellipse(x, y, w, w, Math.PI / 2, 0, 4 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  draw(x: number, y: number, w: number, h: number) {
    const image = new Image();
    image.src = this.saved;
    image.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      w = w < 0 ? -w : w;
      this.ctx.ellipse(x, y, w, w, Math.PI / 2, 0, 4 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }
}
