interface Props {
  color: string;
  squareSize: number;
  highlights: boolean;
  onClick: () => void;
}

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
