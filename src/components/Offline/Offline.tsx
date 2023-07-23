import { useState } from "react";
import SpecialBots from "../../config/SpecialBots";
import AISelect from "./AISelect";
import Game from "../Game/Game";

function Offline() {
  const [play, setPlay] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [hovered, setHovered] = useState(-1);

  return play ? (
    <Game aiOpponent={selected !== 0} aiTrait={SpecialBots[selected]} />
  ) : (
    <AISelect
      botList={SpecialBots}
      selected={selected}
      setSelected={setSelected}
      hovered={hovered}
      setHovered={setHovered}
      setPlay={setPlay}
    />
  );
}

export default Offline;
