import ImageMap from "../config/ImageMap";
import Player from "../classes/Player";
import { useState, useRef } from "react";

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
  const color = player.getIsWhite() ? "White" : "Black";

  const incomingImage = color + player.getPiece();
  const [imageName, setImageName] = useState(color + player.getPiece());

  const incomingPosition = player.getPos();
  const position = useRef(player.getPos());

  // Triggers when piece moves
  if (incomingPosition !== position.current) {
    position.current = incomingPosition;
    setTimeout(() => setImageName(incomingImage), 200);
  }

  const [row, col] = position.current;
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
