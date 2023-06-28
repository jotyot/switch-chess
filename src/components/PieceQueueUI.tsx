import ImageMap from "../classes/ImageMap";

interface Props {
  color: string;
  image: string;
  squareSize: number;
  extraClasses?: string;
}

function PieceQueueUI({ color, image, squareSize, extraClasses = "" }: Props) {
  return (
    <div
      className={"rounded bg-" + color + " " + extraClasses}
      style={{
        height: squareSize + "px",
        width: squareSize + "px",
      }}
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
