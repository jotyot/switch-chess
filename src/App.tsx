import { useState } from "react";
import Game from "./components/Game/Game";
import { SpecialBots } from "./config/Opponents";
import OpponentCard from "./components/OpponentCard";
import { Opponent } from "./classes/Opponent";

function App() {
  const [opponent, setOpponent] = useState<Opponent>(SpecialBots[0]);
  const [play, setPlay] = useState(false);

  return (
    <div
      style={{
        backgroundColor: "mintcream",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <OpponentCard
        onClick={() => setPlay(!play)}
        opponent={opponent}
        setOpponent={setOpponent}
      />
      {play && <Game opponent={opponent} />}
    </div>
  );
}

export default App;
