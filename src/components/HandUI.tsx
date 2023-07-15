import ImageMap from "../config/ImageMap";
import Colors from "../config/Colors";

interface Props {
  image: string;
  squareSize: number;
  onClick: () => void;
}

function HandUI({ image, squareSize, onClick }: Props) {
  const dynamicSquare = {
    height: squareSize + "px",
    width: squareSize + "px",
    transitionProperty: "all",
    transitionDuration: "0.05s",
    transitionTimingFunction: "ease-out",
  };

  return (
    <div
      className={
        "d-flex justify-content-center rounded translate-middle-y mx-1"
      }
      style={{
        backgroundColor: Colors.secondary,
        ...dynamicSquare,
      }}
      onClick={onClick}
    >
      {image && (
        <img
          src={ImageMap.get(image)}
          alt=""
          className="row"
          style={{
            ...dynamicSquare,
          }}
        ></img>
      )}
    </div>
  );
}

export default HandUI;
