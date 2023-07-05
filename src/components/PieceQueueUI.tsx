import ImageMap from "../classes/ImageMap";
import Colors from "../classes/Colors";

interface Props {
  extraClasses?: string;
  image: string;
  squareSize: number;
  onClick: () => void;
}

function PieceQueueUI({
  image,
  squareSize,
  extraClasses = "",
  onClick,
}: Props) {
  return (
    <div
      className={"rounded bg-" + " " + extraClasses}
      style={{
        height: squareSize + "px",
        width: squareSize + "px",
        backgroundColor: Colors.secondary,
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
