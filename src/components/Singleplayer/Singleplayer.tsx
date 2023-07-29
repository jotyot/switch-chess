import { useState } from "react";
import SpecialBots from "../../config/SpecialBots";
import AISelect from "./AISelect";
import Game from "../Game/Game";
import BackButtonHeader from "../BackButtonHeader";

interface Props {
  onExit: () => void;
}

function Singleplayer({ onExit }: Props) {
  const [play, setPlay] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [hovered, setHovered] = useState(-1);

  return (
    <div>
      {play && (
        <Game
          onExit={() => setPlay(false)}
          aiOpponent
          aiTrait={SpecialBots[selected]}
        />
      )}
      {!play && (
        <div>
          <BackButtonHeader width={383} height={30} onClick={onExit} />
          <AISelect
            botList={SpecialBots}
            selected={selected}
            setSelected={setSelected}
            hovered={hovered}
            setHovered={setHovered}
            setPlay={setPlay}
          />
        </div>
      )}
    </div>
  );
}

export default Singleplayer;
