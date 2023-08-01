import ImageMap from "../../config/ImageMap";
import ArrowButton from "./ArrowButton";
import { useRef } from "react";

interface Props {
  skinID: string;
  piece: string;
  setPiece: (s: string) => void;
}

function PieceDisplay({ skinID, piece, setPiece }: Props) {
  const pieces = [
    "Pawn",
    "Rook",
    "Bishop",
    "Knight",
    "Queen",
    "King",
    "SuperPawn",
  ];
  const selected = useRef(pieces.indexOf(piece));
  const squareSize = 80;

  function cyclePiece(add: boolean) {
    add
      ? (selected.current =
          selected.current === pieces.length - 1 ? 0 : selected.current + 1)
      : (selected.current =
          selected.current === 0 ? pieces.length - 1 : selected.current - 1);
    setPiece(pieces[selected.current]);
  }

  return (
    <div
      className="d-flex position-relative justify-content-center align-items-center"
      style={{ marginTop: "30px" }}
    >
      <ArrowButton
        text="<<"
        onClick={() => {
          cyclePiece(false);
        }}
      />
      <div
        className="d-flex position-relative align-items-center"
        style={{ width: 2 * squareSize + "px" }}
      >
        <div className="d-flex position-absolute justify-content-center">
          <img
            src={ImageMap.get(skinID + "BlackSquare")}
            style={{ width: squareSize + "px", height: squareSize + "px" }}
          ></img>
          <img
            src={ImageMap.get(skinID + "WhiteSquare")}
            style={{ width: squareSize + "px", height: squareSize + "px" }}
          ></img>
        </div>
        <div className="d-flex position-absolute justify-content-center">
          <img
            src={ImageMap.get(skinID + "White" + piece)}
            style={{ width: squareSize + "px", height: squareSize + "px" }}
          ></img>
          <img
            src={ImageMap.get(skinID + "Black" + piece)}
            style={{ width: squareSize + "px", height: squareSize + "px" }}
          ></img>
        </div>
      </div>
      <ArrowButton
        text=">>"
        onClick={() => {
          cyclePiece(true);
        }}
      />
    </div>
  );
}

export default PieceDisplay;
