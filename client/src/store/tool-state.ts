import { makeAutoObservable } from "mobx";

class ToolState {
  tool: any = null;
  constructor() {
    makeAutoObservable(this);
  }

  setFillColor(color: string) {
    this.tool.fillColor = color;
  }

  setStrokeColor(color: string) {
    this.tool.strokeColor = color;
  }

  setLineWidth(width: string) {
    this.tool.lineWidth = +width;
  }

  setTool(tool: any) {
    this.tool = tool;
  }

  getTool() {
    return this.tool;
  }
}

export default new ToolState();
