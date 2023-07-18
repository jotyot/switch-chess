interface Props {
  color: string;
  squareSize: number;
  highlights: boolean;
  onClick: () => void;
}

/**
 * An individual chess board square
 * @param color a bpotstrap color I should change this
 * @param squareSize size of a side of the square in px
 * @param highlights whether the square shows clickability
 * @param onClick function that executes on click of the square
 * @returns a JSX element of the chess board square
 */
function Square({ color, squareSize, highlights = false, onClick }: Props) {
  return (
    <div
      className={"rounded btn btn-" + color}
      style={{
        height: squareSize + "px",
        width: squareSize + "px",
        pointerEvents: highlights ? "all" : "none",
      }}
      onClick={onClick}
    ></div>
  );
}

export default Square;
