import { useRef } from "react";
import Square from "./Square";
import BoardState from "../classes/BoardState";

interface Props {
  boardState: BoardState;
  squareSize: number;
  onClick: (i: number, j: number) => void;
}

function Board({ squareSize, boardState, onClick }: Props) {
  const highlighted = false;

  const contents = boardState.getBoardContents();
  const [numRows, numCols] = boardState.getBoardSize();
  const highlights = highlighted
    ? boardState.getBoardHighlights()
    : [...Array(numRows).fill(Array(numCols).fill(false))];

  const whiteOrigin = useRef([numRows - 1, ~~(numCols / 2)]);
  const blackOrigin = useRef([0, ~~(numCols / 2) - 1]);

  return (
    <div
      className="container"
      style={{
        width: squareSize * numCols + "px",
      }}
    >
      {contents.map((row, i) => {
        return (
          <div className="row" key={i}>
            {row.map((item, j) => {
              let offset = [0, 0];

              if (item) {
                if (item.slice(0, 5) === "White") {
                  const [a, b] = whiteOrigin.current;
                  offset = [a - i, b - j];
                } else if (item.slice(0, 5) === "Black") {
                  const [a, b] = blackOrigin.current;
                  offset = [a - i, b - j];
                }
              }

              return (
                <Square
                  squareSize={squareSize}
                  color={(i + j) % 2 === 0 ? "light" : "dark"}
                  highlights={highlights[i][j]}
                  image={item}
                  onClick={() => onClick(i, j)}
                  origin={offset}
                  key={j}
                  updateOrigins={() => {
                    if (item) {
                      if (item.slice(0, 5) === "White") {
                        whiteOrigin.current = [i, j];
                      } else if (item.slice(0, 5) === "Black") {
                        blackOrigin.current = [i, j];
                      }
                    }
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
