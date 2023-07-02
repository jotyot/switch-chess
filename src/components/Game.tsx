import { useRef, useState } from "react";
import Board from "./Board";
import PlayerUI from "./PlayerUI";
import BoardState from "../classes/BoardState";
import PieceQueue from "../classes/PieceQueue";
import AIPlayer from "../classes/AIPlayer";
import ReplayButton from "./ReplayButton";

function Game() {
  const squareSize = 100;
  const [numRows, numCols] = [4, 4];

  const AiOpponent = true;

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

  const boardState = useRef(new BoardState([numRows, numCols], "King", "King"));

  function handleBoardClick(i: number, j: number) {
    boardState.current.attemptMove(
      [i, j],
      () => reRender({ ...render }),
      () => popQueue(boardState.current.getWhiteTurn())
    );
    if (AiOpponent) makeAIMove();
  }

  function handlePieceSwapClick(white: boolean) {
    white ? pieceQueue.current.swapWhite() : pieceQueue.current.swapBlack();
    reRender({ ...render });
  }

  function makeAIMove() {
    const AIMove = AIPlayer.randomMove(boardState.current);
    if (AIMove != null)
      setTimeout(() => {
        boardState.current.attemptMove(
          AIMove,
          () => reRender({ ...render }),
          () => popQueue(boardState.current.getWhiteTurn())
        );
      }, 200);
  }

  return (
    <>
      <PlayerUI
        width={squareSize * numCols}
        white={false}
        pieceQueue={pieceQueue.current.getBlackQueue()}
        onClick={() => {
          handlePieceSwapClick(false);
        }}
      />
      <Board
        squareSize={squareSize}
        boardState={boardState.current}
        onClick={handleBoardClick}
      />
      <PlayerUI
        width={squareSize * numCols}
        white={true}
        pieceQueue={pieceQueue.current.getWhiteQueue()}
        onClick={() => {
          handlePieceSwapClick(true);
        }}
      />
      {boardState.current.getIsOver() && (
        <ReplayButton
          top={-(squareSize * (numRows / 2 + numCols / 3 + numCols / 9) + 16)} // idk wtf this is either
          width={(squareSize * numCols * 2) / 3}
          winner={boardState.current.getWinner()}
        />
      )}
    </>
  );
}

export default Game;
