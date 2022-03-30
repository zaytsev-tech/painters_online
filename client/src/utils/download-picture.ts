import canvasState from "../store/canvas-state";

export const downloadPicture = () => {
  const dataUrl = canvasState.canvas?.toDataURL();
  const tagA = document.createElement("a");
  tagA.href = dataUrl as string;
  tagA.download = canvasState.sessionId + ".jpg";
  document.body.appendChild(tagA);
  tagA.click();
  document.body.removeChild(tagA);
};
