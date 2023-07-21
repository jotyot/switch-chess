import ImageMap from "../config/ImageMap";
import Player from "../classes/Player";
import Timings from "../config/Timings";
import { useState, useRef } from "react";

interface Props {
  boardSize: [number, number];
  flipped: boolean;
  onHover: () => void;
  offHover: () => void;
  player: Player;
  squareSize: number;
}

/**
 * A piece on the board that can be moved
 * @param player An instance of the Player class. Contains white/black and position info
 * @param squareSize Size of the piece in px
 * @param flipped Is the display flipped?
 * @param onHover a function to invoke when the piece is hovered over
 * @param offHover a function to invoke when the piece is stopped being hovered over
 * @returns A JSX element of a chess piece
 */
function Piece({
  player,
  squareSize,
  flipped,
  boardSize,
  onHover,
  offHover,
}: Props) {
  const color = player.getIsWhite() ? "White" : "Black";
  const [numRows, numCols] = boardSize;

  const incomingImage = color + player.getPiece();
  const [imageName, setImageName] = useState(color + player.getPiece());

  // is this ref only used to tell when its position changed?yes
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
    /** sizing and movement */
    player.getAlive() && (
      <div
        className="position-absolute"
        style={{
          top: row * squareSize + squareSize / 2 + "px",
          left: col * squareSize + squareSize / 2 + "px",
          transitionProperty: "left, top",
          transitionDuration:
            Timings.moveDuration / 1000 +
            "s," +
            Timings.moveDuration / 1000 +
            "s",
          transitionTimingFunction: "ease-out",
          pointerEvents: "none",
        }}
      >
        {/** image of the piece. needs to be able to "pop" */}
        <img
          className="position-absolute translate-middle"
          src={ImageMap.get(imageName)}
          style={{
            width: squareSize * (animate ? 0.1 : 1) + "px",
            transitionProperty: "width",
            transitionDuration: Timings.popDuration / 1000 + "s",
            transitionTimingFunction: "ease-out",
            pointerEvents: "none",
          }}
        />
        {/** a smaller square that triggers the player guides when hovered */}
        <div
          className="position-absolute translate-middle"
          style={{
            width: squareSize * 0.4,
            height: squareSize * 0.4,
            pointerEvents: "all",
          }}
          onMouseOver={onHover}
          onMouseLeave={offHover}
        ></div>
      </div>
    )
  );
}

export default Piece;
