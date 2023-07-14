import ImageMap from "../config/ImageMap";
import Player from "../classes/Player";
import { useState } from "react";

interface Props {
  player: Player;
  squareSize: number;
}

function Piece({ player, squareSize }: Props) {
  const incomingImage =
    (player.getIsWhite() ? "White" : "Black") + player.getPiece();
  const [row, col] = player.getPos();
  const [imageName, setImageName] = useState(
    (player.getIsWhite() ? "White" : "Black") + "Pawn"
  );

  if (incomingImage !== imageName)
    setTimeout(() => setImageName(incomingImage), 200);

  return (
    player.getAlive() && (
      <img
        className="position-absolute"
        src={ImageMap.get(imageName)}
        style={{
          width: squareSize + "px",
          top: row * squareSize + "px",
          left: col * squareSize + "px",
          pointerEvents: "none",
          transitionProperty: "all",
          transitionDuration: "0.1s",
          transitionTimingFunction: "ease-out",
        }}
      ></img>
    )
  );
}

export default Piece;
