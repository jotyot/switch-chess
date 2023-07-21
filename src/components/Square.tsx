import ImageMap from "../config/ImageMap";

interface Props {
  color: string;
  clickable: boolean;
  squareSize: number;
  guides: boolean;
  onClick: () => void;
}

/**
 * An individual chess board square
 * @param color "White" "Black"
 * @param squareSize size of a side of the square in px
 * @param clickable whether the square shows clickability
 * @param guides does this square have a highlight on it?
 * @param onClick function that executes on click of the square
 * @returns a JSX element of the chess board square
 */
function Square({ color, squareSize, clickable, guides, onClick }: Props) {
  return (
    <>
      <div
        className="rounded btn position-relative hover"
        style={{
          height: squareSize + "px",
          width: squareSize + "px",
          pointerEvents: clickable ? "all" : "none",
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
        <div
          className="rounded position-absolute top-0 start-0"
          style={{
            height: squareSize + "px",
            width: squareSize + "px",
            backgroundColor: "blue",
            opacity: guides ? "0.1" : "0",
            transitionProperty: "opacity",
            transitionDuration: "0.2s",
            transitionTimingFunction: "ease-out",
            pointerEvents: "none",
          }}
        />
      </div>
    </>
  );
}

export default Square;
