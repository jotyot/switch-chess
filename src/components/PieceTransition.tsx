import ImageMap from "../config/ImageMap";

interface Props {
  piece: string;
  squareSize: number;
  origin: [number, number];
}

function PieceTransition({ piece, squareSize, origin }: Props) {
  return (
    <img
      className="position-absolute pieceTransition"
      src={ImageMap.get(piece)}
      style={
        {
          top: "0px",
          left: "0px",
          width: squareSize + "px",
          pointerEvents: "none",
          "--origin-top": origin[0] * squareSize + "px",
          "--origin-left": origin[1] * squareSize + "px",
        } as React.CSSProperties
      }
    ></img>
  );
}

export default PieceTransition;
