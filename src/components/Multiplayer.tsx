import { useState } from "react";
import CenterButton from "./CenterButton";
import Game from "./Game/Game";
import BackButtonHeader from "./BackButtonHeader";

interface Props {
  onExit: () => void;
}

function Multiplayer({ onExit }: Props) {
  const [play, setPlay] = useState(false);

  return (
    <div>
      {!play && (
        <div>
          <BackButtonHeader width={320} height={30} onClick={onExit} />
          <CenterButton
            width={320}
            height={80}
            fontSize={30}
            text="Offline"
            onClick={() => setPlay(true)}
          />
          <CenterButton
            width={320}
            height={80}
            fontSize={30}
            text="Online (coming soon)"
          />
        </div>
      )}
      {play && <Game onExit={() => setPlay(false)} />}
    </div>
  );
}

export default Multiplayer;
