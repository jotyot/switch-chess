import { useState } from "react";
import Game from "./components/Game/Game";
import { SpecialBots } from "./config/Opponents";
import OpponentCard from "./components/Menu/OpponentCard";
import { Opponent } from "./classes/Opponent";
import Skins from "./config/Skins";

function App() {
  const [opponent, setOpponent] = useState<Opponent>(SpecialBots[0]);
  const [skin, setSkin] = useState(Skins[0]);
  const [play, setPlay] = useState(false);
  const [piece, setPiece] = useState("Pawn");

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
        skin={skin}
        setSkin={setSkin}
        piece={piece}
        setPiece={setPiece}
      />
      {play && <Game opponent={opponent} playerSkinID={skin.id} />}
    </div>
  );
}

export default App;
