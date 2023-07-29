import { useState } from "react";
import Singleplayer from "./components/Singleplayer/Singleplayer";
import CenterButton from "./components/CenterButton";
import Multiplayer from "./components/Multiplayer";

function App() {
  const [screen, setScreen] = useState("main");

  return (
    <div
      style={{
        backgroundColor: "mintcream",
        overflow: "hidden",
        height: "100vh",
      }}
    >
      {screen === "main" && (
        <div>
          <CenterButton
            width={350}
            height={80}
            fontSize={30}
            text="Singleplayer"
            onClick={() => setScreen("singleplayer")}
          />
          <CenterButton
            width={350}
            height={80}
            fontSize={30}
            text="Multiplayer"
            onClick={() => setScreen("multiplayer")}
          />
        </div>
      )}
      {screen === "singleplayer" && (
        <Singleplayer onExit={() => setScreen("main")} />
      )}
      {screen === "multiplayer" && (
        <Multiplayer onExit={() => setScreen("main")} />
      )}
    </div>
  );
}

export default App;
