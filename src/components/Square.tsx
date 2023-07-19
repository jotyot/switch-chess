import ImageMap from "../config/ImageMap";

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
      className="rounded btn position-relative hover"
      style={{
        height: squareSize + "px",
        width: squareSize + "px",
        pointerEvents: highlights ? "all" : "none",
      }}
      onClick={onClick}
    >
      <img
        className="rounded position-absolute top-0 start-0"
        src={ImageMap.get(color + "Square")}
        style={{
          height: squareSize + "px",
          width: "auto",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default Square;
