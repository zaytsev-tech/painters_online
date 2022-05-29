import { FC } from "react";
import toolState from "../store/tool-state";
import "../styles/toolbar.scss";

const SettingBar: FC = () => {
  return (
    <div className="setting-bar">
      <label className="line-width" htmlFor="line-width">
        Line width:{" "}
      </label>
      <input
        id="line-width"
        type="number"
        min={0}
        defaultValue={0}
        max={50}
        onChange={(e) => toolState.setLineWidth(e.target.value)}
      />
      <label className="line-width" htmlFor="stroke-color">
        Stroke color:{" "}
      </label>
      <input
        id="stroke-color"
        type="color"
        defaultValue="#000000"
        onChange={(e) => toolState.setStrokeColor(e.target.value)}
      />
    </div>
  );
};

export default SettingBar;
