import Square from "./Square";
import BoardState from "../classes/BoardState";
import Piece from "./Piece";
import { useState } from "react";
import PieceMoves from "../classes/PieceMoves";

interface Props {
  boardState: BoardState;
  flipped: boolean;
  squareSize: number;
  onClick: (i: number, j: number) => void;
}

/**
 * A grid of squares with players that reflect the boardState.
 * @param squareSize number of px the squares on the board are
 * @param boardState a boardState class instance
 * @param onClick a function that can be mapped to an individual square
 * @returns A JSX element containing information about the state of the chess board + pieces
 */
function Board({ squareSize, boardState, flipped, onClick }: Props) {
  const [numRows, numCols] = boardState.getBoardSize();
  const playerMoves = PieceMoves.movesFromBoardState(boardState, true);

  let highlights = PieceMoves.movesToMap(playerMoves, [numRows, numCols]);
  if (flipped) highlights = highlights.map((row) => row.reverse()).reverse();
  const [guides, setGuides] = useState(
    [...Array(numRows)].map(() => Array(numCols).fill(false))
  );

  /**
   * sets the current highlights to those of the piece we are hovering
   * @param isWhite are we getting the guides of the white piece?
   */
  function showGuides(isWhite: boolean): void {
    const isPlayer = boardState.getWhiteTurn() ? isWhite : !isWhite;
    const moves = PieceMoves.movesFromBoardState(boardState, isPlayer);

    let guides = PieceMoves.movesToMap(moves, [numRows, numCols]);
    if (flipped) guides = guides.map((row) => row.reverse()).reverse();
    setGuides(guides);
  }

  return (
    <div
      className="container position-relative"
      style={{
        width: squareSize * numCols + "px",
      }}
    >
      {highlights.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map((item, j) => {
              const r = flipped ? numRows - i - 1 : i;
              const c = flipped ? numCols - j - 1 : j;

              return (
                <Square
                  squareSize={squareSize}
                  color={(r + c) % 2 === 0 ? "White" : "Black"}
                  clickable={item}
                  onClick={() => onClick(r, c)}
                  guides={guides[i][j]}
                  key={j}
                />
              );
            })}
          </div>
        );
      })}
      <Piece
        player={boardState.getWhite()}
        squareSize={squareSize}
        flipped={flipped}
        boardSize={[numRows, numCols]}
        onHover={() => showGuides(true)}
        offHover={() =>
          setGuides([...Array(numRows)].map(() => Array(numCols).fill(false)))
        }
      />
      <Piece
        player={boardState.getBlack()}
        squareSize={squareSize}
        flipped={flipped}
        boardSize={[numRows, numCols]}
        onHover={() => showGuides(false)}
        offHover={() =>
          setGuides([...Array(numRows)].map(() => Array(numCols).fill(false)))
        }
      />
    </div>
  );
}

export default Board;
