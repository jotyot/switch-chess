import ImageMap from "../classes/ImageMap";

interface Props {
  color: string;
  extraClasses?: string;
  image: string;
  squareSize: number;
  onClick: () => void;
}

function PieceQueueUI({
  color,
  image,
  squareSize,
  extraClasses = "",
  onClick,
}: Props) {
  return (
    <div
      className={"rounded bg-" + color + " " + extraClasses}
      style={{
        height: squareSize + "px",
        width: squareSize + "px",
      }}
      onClick={onClick}
    >
      {image && (
        <img
          src={ImageMap.get(image)}
          alt=""
          className="row"
          style={{
            height: "auto",
            width: squareSize + "px",
          }}
        ></img>
      )}
    </div>
  );
}

export default PieceQueueUI;
