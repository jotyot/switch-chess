interface Props {
  color: string;
  squareSize: number;
  highlights: boolean;
  onClick: () => void;
}

function Square({ color, squareSize, highlights = false, onClick }: Props) {
  return (
    <div
      className={"rounded " + (highlights ? "btn btn-" : "bg-") + color}
      style={{
        height: squareSize + "px",
        width: squareSize + "px",
      }}
      onClick={onClick}
    ></div>
  );
}

export default Square;
