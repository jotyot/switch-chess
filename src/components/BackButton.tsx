import Colors from "../config/Colors";

interface Props {
  onClick: () => void;
  height: number;
}

function BackButton({ onClick, height }: Props) {
  const width = 100;
  const fontSize = 40;
  return (
    <div
      className="d-flex justify-content-center start-0 
        position-absolute btn rounded hover"
      style={{
        height: height + "px",
        width: width + "px",
        backgroundColor: Colors.secondary,
      }}
      onClick={onClick}
    >
      <div
        className="translate-middle-y top-50 position-absolute"
        style={{ fontSize: fontSize + "px", fontWeight: "bold" }}
      >
        ←
      </div>
    </div>
  );
}

export default BackButton;
