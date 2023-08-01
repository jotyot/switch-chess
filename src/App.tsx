import { useState, useRef } from "react";
import Game from "./components/Game/Game";
import { SpecialBots } from "./config/Opponents";
import OpponentCard from "./components/Menu/OpponentCard";
import { Opponent } from "./classes/Opponent";
import { Skins } from "./config/Skins";
import Colors from "./config/Colors";

function App() {
  const [opponent, setOpponent] = useState<Opponent>(SpecialBots[0]);
  const [skin, setSkin] = useState(Skins[0]);
  const [play, setPlay] = useState(true);
  const [piece, setPiece] = useState("Pawn");
  const [superPawn, setSuperPawn] = useState(false);
  const gameOpponenet = useRef(opponent.name);

  return (
    <div
      style={{
        backgroundColor: superPawn ? Colors.dark : Colors.tertiary,
        minHeight: "100vh",
        overflow: "hidden",
        transitionProperty: "all",
        transitionDuration: "0.5s",
      }}
    >
      <div
        style={{
          height: "700px",
          minHeight: "700px",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        <OpponentCard
          resetGame={() => {
            gameOpponenet.current = opponent.name;
            setPlay(false);
            setTimeout(() => setPlay(true), 1);
          }}
          opponent={opponent}
          setOpponent={setOpponent}
          skin={skin}
          setSkin={setSkin}
          piece={piece}
          setPiece={setPiece}
          currentOpponent={gameOpponenet.current}
        />
        {play && (
          <Game
            opponent={opponent}
            playerSkinID={skin.id}
            setSuperPawn={setSuperPawn}
          />
        )}
      </div>
    </div>
  );
}

export default App;
