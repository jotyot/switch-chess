import Square from "./Square";
import BoardState from "../classes/BoardState";
import Piece from "./Piece";

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

  let highlights: boolean[][] = boardState.getBoardHighlights();
  if (flipped) highlights = highlights.map((row) => row.reverse()).reverse();

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
                  highlights={item}
                  onClick={() => onClick(r, c)}
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
      />
      <Piece
        player={boardState.getBlack()}
        squareSize={squareSize}
        flipped={flipped}
      />
    </div>
  );
}

export default Board;
