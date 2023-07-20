import ImageMap from "../config/ImageMap";
import Player from "../classes/Player";
import Timings from "../config/Timings";
import { useState, useRef } from "react";

interface Props {
  boardSize: [number, number];
  flipped: boolean;
  player: Player;
  squareSize: number;
}

/**
 * A piece on the board that can be moved
 * @param player An instance of the Player class. Contains white/black and position info
 * @param squareSize Size of the piece in px
 * @param flipped Is the display flipped?
 * @returns A JSX element of a chess piece
 */
function Piece({ player, squareSize, flipped, boardSize }: Props) {
  const color = player.getIsWhite() ? "White" : "Black";
  const [numRows, numCols] = boardSize;

  const incomingImage = color + player.getPiece();
  const [imageName, setImageName] = useState(color + player.getPiece());

  const incomingPosition = player.getPos();
  const position = useRef(player.getPos());

  const [animate, setAnimate] = useState(false);

  const popStart = Timings.moveDuration + Timings.popDelay;

  // Triggers when piece moves
  if (incomingPosition !== position.current) {
    position.current = incomingPosition;
    setTimeout(() => {
      setAnimate(true);
      setImageName(incomingImage);
    }, popStart);
    setTimeout(() => setAnimate(false), popStart + Timings.popDuration);
  }

  let [row, col] = position.current;
  if (flipped) [row, col] = [numRows - row - 1, numCols - col - 1];

  return (
    player.getAlive() && (
      <img
        className="position-absolute translate-middle"
        src={ImageMap.get(imageName)}
        style={{
          top: row * squareSize + squareSize / 2 + "px",
          left: col * squareSize + squareSize / 2 + "px",

          width: squareSize * (animate ? 0.1 : 1) + "px",
          pointerEvents: "none",

          transitionProperty: "left, top, width",
          transitionDuration:
            Timings.moveDuration / 1000 +
            "s," +
            Timings.moveDuration / 1000 +
            "s," +
            Timings.popDuration / 1000 +
            "s",
          transitionTimingFunction: "ease-out",
        }}
      ></img>
    )
  );
}

export default Piece;
