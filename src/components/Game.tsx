import { useRef, useState } from "react";
import Board from "./Board";
import PlayerUI from "./PlayerUI";
import BoardState from "../classes/BoardState";
import Hand from "../classes/Hand";
import AIPlayer from "../classes/AIPlayer";
import ReplayButton from "./ReplayButton";
import PiecePoints from "../config/PiecePoints";
import AITraits from "../classes/AITraits";

/**
 * @todo players switch sides every round
 *
 * A functional game with its own score, etc. Play against AI or on same device player
 * @returns A collection of board and playerUI JSX elements that constitute a game.
 */
function Game() {
  const squareSize = 100;
  const [numRows, numCols] = [4, 4];
  const handSize = 2;
  const winningTotal = 6;

  const aiOpp = useRef(true);

  // idk how else to rerender the board since i cant tell the useState that the boardState changed
  const [render, setRender] = useState([0]);

  const scores = useRef([0, 0]);
  const gameWinner = useRef("White");

  /** .CURRENT */ const gameOver = useRef(false);
  /** .CURRENT */ const displayFlip = useRef(false);
  /** .CURRENT */ const playerSwap = useRef(false);

  const reRender = () => setRender({ ...render });

  /**
   * Arguments for a default board in a tuple so I dont have to repeat this monstrosity twice
   */
  const defualtBoard: [
    [number, number],
    string,
    string,
    () => void,
    (winner: boolean, piece: string) => void
  ] = [[numRows, numCols], "King", "King", reRender, newRound];
  const boardState = useRef(new BoardState(...defualtBoard));

  const whiteHand = useRef(new Hand(handSize, reRender));
  const blackHand = useRef(new Hand(handSize, reRender));

  // const traits = new AITraits([])
  const traits = new AITraits(["checkmater"]);
  const aiPlayer = new AIPlayer(
    boardState,
    playerSwap.current ? whiteHand : blackHand,
    traits
  );

  /**
   * Shorthand for getting the next piece swap
   * Modifies the queue for white or black depending on the turn
   * @param white Is it white's turn?
   * @returns A string of the new piece
   */
  function newPiece(white: boolean) {
    return white
      ? whiteHand.current.popSelected()
      : blackHand.current.popSelected();
  }

  /**
   * Handles clicking of the board
   * @param i Row of the square clicked
   * @param j Column of the square clicked
   */
  function handleBoardClick(i: number, j: number): void {
    const whiteTurn = boardState.current.getWhiteTurn();

    if (aiOpp.current && (playerSwap.current ? whiteTurn : !whiteTurn)) return;

    boardState.current.attemptMove([i, j], () =>
      newPiece(boardState.current.getWhiteTurn())
    );
    if (aiOpp.current) aiPlayer.makeAIMove();
  }

  /**
   * Handles clicking of the pieces in hand
   * modifies the selected index of the hand to whatever was clicked
   * @param white Is this the white or black hand?
   * @param index Which piece was clicked on
   */
  function handleHandClick(white: boolean, index: number): void {
    //if (aiOpp.current && (playerSwap.current ? white : !white)) return;

    white
      ? whiteHand.current.setSelected(index)
      : blackHand.current.setSelected(index);
  }

  /**
   * Remakes the board with new boardstate and new hands, but score is preserved
   */
  function resetBoard(): void {
    displayFlip.current = !displayFlip.current;
    playerSwap.current = !playerSwap.current;

    boardState.current = new BoardState(...defualtBoard);
    whiteHand.current = new Hand(handSize, reRender);
    blackHand.current = new Hand(handSize, reRender);
    reRender();

    if (aiOpp.current && !gameOver.current && playerSwap.current) {
      // a little annoying but to prevent white Ai start from using blackhand
      new AIPlayer(boardState, whiteHand, traits).makeAIMove();
    }
  }

  /**
   * Updates the score, starts a new board, sets gameOver to true if win threshold has been passed.
   * @remarks called from inside BoardState
   * @param winner Did white or black win that round? (Captured the other's piece)
   * @param piece What piece got captured
   */
  function newRound(winner: boolean, piece: string): void {
    if (playerSwap.current) winner = !winner;

    let scoreMod = PiecePoints.get(piece) || [0, 0];
    scoreMod = winner ? scoreMod : [scoreMod[1], scoreMod[0]];
    scores.current = scores.current.map((num, i) => num + scoreMod[i]);

    setTimeout(() => {
      if (Math.max(...scores.current) >= winningTotal) {
        const [score1, score2] = scores.current;
        gameWinner.current = score1 > score2 ? "Player 1" : "Player 2";
        if (score1 === score2) gameWinner.current = "";
        gameOver.current = true;
        reRender();
      } else resetBoard();
    }, 500);
  }

  /**
   * Resets the board and resets the score. Called by the reset button
   */
  function resetGame(): void {
    resetBoard();
    displayFlip.current = false;
    playerSwap.current = false;

    gameOver.current = false;
    scores.current = [0, 0];
  }

  const whiteUI = (
    <PlayerUI
      score={scores.current[playerSwap.current ? 1 : 0]}
      width={squareSize * numCols}
      white={true}
      hand={whiteHand.current}
      onClick={handleHandClick}
    />
  );

  const blackUI = (
    <PlayerUI
      score={scores.current[playerSwap.current ? 0 : 1]}
      width={squareSize * numCols}
      white={false}
      hand={blackHand.current}
      onClick={handleHandClick}
    />
  );

  return (
    <div className="position-relative">
      <button
        className="btn btn-primary"
        onClick={() => {
          aiOpp.current = !aiOpp.current;
          reRender();
        }}
      >
        {aiOpp.current ? "ai" : "no"}
      </button>
      {displayFlip.current ? whiteUI : blackUI}
      <Board
        flipped={displayFlip.current}
        squareSize={squareSize}
        boardState={boardState.current}
        onClick={handleBoardClick}
      />
      {displayFlip.current ? blackUI : whiteUI}
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
