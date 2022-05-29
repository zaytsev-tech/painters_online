import React from "react";
import "./App.css";
import Canvas from "./components/canvas";
import { ChatComponent } from "./components/chat";
import SettingBar from "./components/setting-bar";
import Toolbar from "./components/toolbar";
import "./styles/app.scss";

function App() {
  return (
    <div className="app">
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
  );
}

export default App;
