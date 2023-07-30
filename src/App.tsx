import { useState, useRef } from "react";
import Game from "./components/Game/Game";
import { SpecialBots } from "./config/Opponents";
import OpponentCard from "./components/OpponentCard";
import { Opponent } from "./classes/Opponent";

function App() {
  const sideSwap = useRef(false);
  const [render, setRender] = useState([0]);
  const [opponent, setOpponent] = useState<Opponent>(SpecialBots[0]);
  const [play, setPlay] = useState(true);

  return (
    <div
      style={{
        backgroundColor: sideSwap.current ? "darkgray" : "mintcream",
        transitionProperty: "background",
        transitionDuration: "0.5s",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <OpponentCard
        onClick={() => setPlay(!play)}
        opponent={opponent}
        setOpponent={setOpponent}
      />
      {play && (
        <Game
          opponent={opponent}
          onSwap={() => {
            sideSwap.current = !sideSwap.current;
            setRender({ ...render });
          }}
        />
      )}
    </div>
  );
}

export default App;
