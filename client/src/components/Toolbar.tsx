import { ChangeEvent, FC } from "react";
import "../styles/toolbar.scss";
import toolState from "../store/tool-state";
import Brush from "../tools/brush";
import canvasState from "../store/canvas-state";
import Rect from "../tools/rect";
import Circle from "../tools/circle";
import Eraser from "../tools/eraser";
import Line from "../tools/line";
import { downloadPicture } from "../utils/download-picture";

const Toolbar: FC = () => {
  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    toolState.setStrokeColor("#000000");
    toolState.setFillColor(e.target.value);
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar__btn brush"
        onClick={() => {
          canvasState.socket &&
            canvasState.sessionId &&
            toolState.setTool(
              new Brush(
                canvasState.canvas,
                canvasState.socket,
                canvasState.sessionId
              )
            );
        }}
      />
      <button
        className="toolbar__btn rect"
        onClick={() => {
          toolState.setTool(
            canvasState.socket &&
              canvasState.sessionId &&
              new Rect(
                canvasState.canvas,
                canvasState.socket,
                canvasState.sessionId
              )
          );
        }}
      />
      <button
        className="toolbar__btn circle"
        onClick={() => {
          toolState.setTool(new Circle(canvasState.canvas));
        }}
      />
      <button
        className="toolbar__btn eraser"
        onClick={() => {
          toolState.setTool(new Eraser(canvasState.canvas));
        }}
      />
      <button
        className="toolbar__btn line"
        onClick={() => {
          toolState.setTool(new Line(canvasState.canvas));
        }}
      />
      <input
        onChange={(e) => changeColor(e)}
        style={{ marginLeft: "10px" }}
        type="color"
      />
      <button
        className="toolbar__btn undo"
        onClick={() => canvasState.undo()}
      />
      <button
        className="toolbar__btn redo"
        onClick={() => canvasState.redo()}
      />
      <button className="toolbar__btn save" onClick={() => downloadPicture()} />
    </div>
  );
};

export default Toolbar;
