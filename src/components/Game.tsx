import { useRef, useState } from "react";
import Board from "./Board";
import PlayerUI from "./PlayerUI";
import BoardState from "../classes/BoardState";
import Hand from "../classes/Hand";
import AIPlayer from "../classes/AIPlayer";
import ReplayButton from "./ReplayButton";
import PiecePoints from "../config/PiecePoints";

function Game() {
  const squareSize = 100;
  const [numRows, numCols] = [4, 4];
  const handSize = 2;
  const aiSpeed = 500;
  const winningTotal = 10;

  const aiOpponent = true;

  // idk how else to rerender the board since i cant tell the useState that the boardState changed
  const [render, reRender] = useState([0]);

  const whiteHand = useRef(new Hand(handSize));
  const blackHand = useRef(new Hand(handSize));

  const defualtBoard: [
    number[],
    string,
    string,
    () => void,
    (winner: boolean, piece: string) => void
  ] = [
    [numRows, numCols],
    "King",
    "King",
    () => {
      reRender({ ...render });
    },
    newRound,
  ];

  const boardState = useRef(new BoardState(...defualtBoard));
  const scores = useRef([0, 0]);
  const gameOver = useRef(false);
  const gameWinner = useRef("White");

  function newPiece(white: boolean) {
    return white
      ? whiteHand.current.popSelected()
      : blackHand.current.popSelected();
  }

  function handleBoardClick(i: number, j: number) {
    if (aiOpponent && !boardState.current.getWhiteTurn()) return;

    boardState.current.attemptMove([i, j], () =>
      newPiece(boardState.current.getWhiteTurn())
    );
    if (aiOpponent) makeAIMove();
  }

  function handleHandClick(white: boolean, index: number) {
    white
      ? whiteHand.current.setSelected(index)
      : blackHand.current.setSelected(index);
    reRender({ ...render });
  }

  function makeAIMove() {
    const AIMove = AIPlayer.randomMove(boardState.current);
    if (AIMove != null) {
      setTimeout(() => {
        boardState.current.attemptMove(AIMove, () =>
          newPiece(boardState.current.getWhiteTurn())
        );
      }, aiSpeed);
    }
  }

  function resetBoard() {
    boardState.current = new BoardState(...defualtBoard);
    whiteHand.current = new Hand(handSize);
    blackHand.current = new Hand(handSize);
    reRender({ ...render });
  }

  function newRound(winner: boolean, piece: string) {
    let scoreMod = PiecePoints.get(piece) || [0, 0];
    scoreMod = winner ? scoreMod : [scoreMod[1], scoreMod[0]];
    scores.current = scores.current.map((num, i) => num + scoreMod[i]);

    setTimeout(() => {
      if (Math.max(...scores.current) >= winningTotal) {
        gameWinner.current = winner ? "White" : "Black";
        gameOver.current = true;
        reRender({ ...render });
      } else resetBoard();
    }, 500);
  }

  function resetGame() {
    resetBoard();
    gameOver.current = false;
    scores.current = [0, 0];
  }

  return (
    <div className="position-relative">
      <PlayerUI
        score={scores.current[1]}
        width={squareSize * numCols}
        white={false}
        hand={blackHand.current}
        onClick={handleHandClick}
      />
      <Board
        squareSize={squareSize}
        boardState={boardState.current}
        onClick={handleBoardClick}
      />
      <PlayerUI
        score={scores.current[0]}
        width={squareSize * numCols}
        white={true}
        hand={whiteHand.current}
        onClick={handleHandClick}
      />
      {gameOver.current && (
        <ReplayButton
          onClick={resetGame}
          width={(squareSize * numCols * 2) / 3}
          winner={gameWinner.current}
        />
      )}
    </div>
  );
}

export default Game;
