import ImageMap from "../config/ImageMap";
import Colors from "../config/Colors";

interface Props {
  image: string;
  squareSize: number;
  onClick: () => void;
}

function PieceQueueUI({ image, squareSize, onClick }: Props) {
  return (
    <div
      className={
        "d-flex justify-content-center rounded translate-middle-y mx-1"
      }
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
