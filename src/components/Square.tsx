import { useState, useEffect } from "react";
import ImageMap from "../classes/ImageMap";

interface Props {
  color: string;
  image: string;
  squareSize: number;
  extraClasses?: string;
  highlights?: boolean;
  onClick?: () => void;
  origin?: number[];
  updateOrigins?: () => void;
}

function Square({
  color,
  image,
  squareSize,
  extraClasses = "",
  highlights = false,
  origin = [0, 0],
  onClick,
  updateOrigins,
}: Props) {
  if (updateOrigins) updateOrigins();

  const [pieceMove, setPieceMove] = useState(true);

  return (
    <div
      className={
        "rounded " +
        (highlights ? "btn btn-" : "bg-") +
        color +
        " " +
        extraClasses
      }
      style={{
        height: squareSize + "px",
        width: squareSize + "px",
      }}
      onClick={onClick}
    >
      {image && (
        <img
          src={ImageMap.get(image)}
          alt=""
          className={"row " + (pieceMove ? "piece-move" : "")}
          style={
            {
              height: "auto",
              width: squareSize + "px",
              "--origin-top": origin[0] * squareSize + "px",
              "--origin-left": origin[1] * squareSize + "px",
            } as React.CSSProperties
          }
        ></img>
      )}
    </div>
  );
}

export default Square;
