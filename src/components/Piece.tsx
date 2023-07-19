import ImageMap from "../config/ImageMap";
import Player from "../classes/Player";
import PieceTransition from "./PieceTransition";
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
  const incomingImage =
    (player.getIsWhite() ? "White" : "Black") + player.getPiece();
  const [imageName, setImageName] = useState(
    (player.getIsWhite() ? "White" : "Black") + "Pawn"
  );
  const [row, col] = player.getPos();
  const [animate, setAnimate] = useState(false);

  if (incomingImage !== imageName) {
    setTimeout(() => setAnimate(true), 50);
    setTimeout(() => setImageName(incomingImage), 200);
    setTimeout(() => setAnimate(false), 300);
  }
  const vertical = row * squareSize + "px";
  const horizontal = col * squareSize + "px";

  return (
    player.getAlive() && (
      <div
        className="position-absolute"
        style={{
          top: flipped ? "auto" : vertical,
          left: flipped ? "auto" : horizontal,
          bottom: flipped ? vertical : "auto",
          right: flipped ? horizontal : "auto",
          pointerEvents: "none",
          transitionProperty: "all",
          transitionDuration: "0.1s",
          transitionTimingFunction: "ease-out",
        }}
      >
        <img
          src={ImageMap.get(imageName)}
          style={{
            width: squareSize + "px",
          }}
        />
        {animate && (
          <PieceTransition
            piece={incomingImage}
            squareSize={squareSize}
            origin={[4 - row, 1.5 - col]}
          />
        )}
      </div>
    )
  );
}

export default Piece;
