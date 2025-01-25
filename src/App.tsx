import { useState, useRef } from "react";
import Game from "./components/Game/Game";
import { SpecialBots } from "./config/Opponents";
import OpponentCard from "./components/Menu/OpponentCard";
import { Opponent } from "./classes/Opponent";
import { Skins } from "./config/Skins";
import Colors from "./config/Colors";

function App() {
  const [opponent, setOpponent] = useState<Opponent>(SpecialBots[1]);
  const [skin, setSkin] = useState(Skins[0]);
  const [play, setPlay] = useState(true);
  const [piece, setPiece] = useState("Pawn");
  const [superPawn, setSuperPawn] = useState(false);
  const gameOpponent = useRef(opponent.name);

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
          height: "672px",
          minHeight: "672px",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        <OpponentCard
          resetGame={() => {
            gameOpponent.current = opponent.name;
            setPlay(false);
            setTimeout(() => setPlay(true), 1);
          }}
          opponent={opponent}
          setOpponent={setOpponent}
          skin={skin}
          setSkin={setSkin}
          piece={piece}
          setPiece={setPiece}
          currentOpponent={gameOpponent.current}
        />
        {play && (
          <Game
            opponent={opponent}
            playerSkinID={skin.id}
            setSuperPawn={setSuperPawn}
          />
        )}
      </div>
      <div
        className="container position-relative rounded mt-2 d-flex justify-content-center align-items-center"
        style={{
          width: 360 + "px",
          height: 40 + "px",
          backgroundColor: Colors.secondary,
          transitionProperty: "height",
          transitionDuration: ".5s",
          overflow: "hidden",
          borderStyle: "solid",
          borderWidth: "3px",
          borderColor: Colors.dark,
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Andy Cho / Jonathan Tran
      </div>
    </div>
  );
}

export default App;
