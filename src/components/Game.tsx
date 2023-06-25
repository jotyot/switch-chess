import { useRef, useState } from "react";
import Board from "./Board";
import PlayerInfo from "./PlayerInfo";
import BoardState from "../classes/BoardState";
import PieceQueue from "../classes/PieceQueue";
import "../styles/Game.css";

function Game() {
  const squareSize = 100;
  const [numRows, numCols] = [4, 4];

  // idk how else to rerender the board since i cant tell the useState that the boardState changed
  const [render, reRender] = useState([0]);

  const pieceQueue = useRef(new PieceQueue());

  function popQueue(white: boolean) {
    const piece = white
      ? pieceQueue.current.getNextWhite()
      : pieceQueue.current.getNextBlack();
    if (piece) return piece;
    else return "Pawn"; //should never happen
  }

  const boardState = useRef(new BoardState([numRows, numCols], "Pawn", "Pawn"));

  function handleClick(i: number, j: number) {
    boardState.current.attemptMove(
      [i, j],
      () => reRender({ ...render }),
      () => popQueue(boardState.current.getWhiteTurn())
    );
  }

  return (
    <>
      <PlayerInfo
        width={squareSize * numCols}
        white={false}
        pieceQueue={pieceQueue.current.getBlackQueue()}
      />
      <Board
        squareSize={squareSize}
        boardState={boardState.current}
        onClick={handleClick}
      />
      <PlayerInfo
        width={squareSize * numCols}
        white={true}
        pieceQueue={pieceQueue.current.getWhiteQueue()}
      />
      <div>{pieceQueue.current.getWhiteQueue()}</div>
    </>
  );
}

export default Game;
