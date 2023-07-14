import { useRef, useState } from "react";
import Board from "./Board";
import PlayerUI from "./PlayerUI";
import BoardState from "../classes/BoardState";
import Hand from "../classes/Hand";
import AIPlayer from "../classes/AIPlayer";
import ReplayButton from "./ReplayButton";

function Game() {
  const squareSize = 100;
  const [numRows, numCols] = [4, 4];
  const handSize = 2;
  const AiSpeed = 300;

  const AiOpponent = true;

  // idk how else to rerender the board since i cant tell the useState that the boardState changed
  const [render, reRender] = useState([0]);

  const whiteHand = useRef(new Hand(handSize));
  const blackHand = useRef(new Hand(handSize));

  function newPiece(white: boolean) {
    const piece = white
      ? whiteHand.current.popSelected()
      : blackHand.current.popSelected();
    if (piece) return piece;
    else return "King"; //should never happen
  }

  const boardState = useRef(
    new BoardState([numRows, numCols], "King", "King", () => {
      reRender({ ...render });
    })
  );

  function handleBoardClick(i: number, j: number) {
    boardState.current.attemptMove([i, j], () =>
      newPiece(boardState.current.getWhiteTurn())
    );
    if (AiOpponent) makeAIMove();
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
      }, AiSpeed);
    } else reRender({ ...render });
  }

  function resetBoard() {
    boardState.current = new BoardState(
      [numRows, numCols],
      "King",
      "King",
      () => {
        reRender({ ...render });
      }
    );
    whiteHand.current = new Hand(handSize);
    blackHand.current = new Hand(handSize);
    reRender({ ...render });
  }

  for (const piece in whiteHand.current.getHand()) console.log(piece);

  return (
    <div className="position-relative">
      <PlayerUI
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
        width={squareSize * numCols}
        white={true}
        hand={whiteHand.current}
        onClick={handleHandClick}
      />
      {boardState.current.getIsOver() && (
        <ReplayButton
          onClick={resetBoard}
          width={(squareSize * numCols * 2) / 3}
          winner={boardState.current.getWinner()}
        />
      )}
    </div>
  );
}

export default Game;
