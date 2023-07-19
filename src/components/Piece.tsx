import ImageMap from "../config/ImageMap";
import Player from "../classes/Player";
import { useState } from "react";

interface Props {
  flipped: boolean;
  player: Player;
  squareSize: number;
}

/**
 * A piece on the board that can be moved
 * @param player An instance of the Player class. Contains white/black and position info
 * @param squareSize Size of the piece in px
 * @returns A JSX element of a chess piece
 */
function Piece({ player, squareSize, flipped }: Props) {
  const incomingImage =
    (player.getIsWhite() ? "White" : "Black") + player.getPiece();
  const [row, col] = player.getPos();
  const [imageName, setImageName] = useState(
    (player.getIsWhite() ? "White" : "Black") + "Pawn"
  );

  if (incomingImage !== imageName)
    setTimeout(() => setImageName(incomingImage), 200);

  const vertical = row * squareSize + "px";
  const horizontal = col * squareSize + "px";

  return (
    player.getAlive() && (
      <img
        className="position-absolute"
        src={ImageMap.get(imageName)}
        style={{
          top: flipped ? "auto" : vertical,
          left: flipped ? "auto" : horizontal,
          bottom: flipped ? vertical : "auto",
          right: flipped ? horizontal : "auto",

          width: squareSize + "px",
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
