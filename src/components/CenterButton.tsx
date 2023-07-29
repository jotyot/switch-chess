import Colors from "../config/Colors";

interface Props {
  onClick?: () => void;
  width: number;
  height: number;
  fontSize: number;
  text: string;
}

function CenterButton({
  width,
  height,
  fontSize,
  text,
  onClick = () => {},
}: Props) {
  return (
    <div
      className="d-flex justify-content-center start-50 translate-middle-x 
    position-relative mt-5 btn rounded hover"
      style={{
        height: height + "px",
        width: width + "px",
        backgroundColor: Colors.primary,
      }}
      onClick={onClick}
    >
      <div
        className="translate-middle-y top-50 position-absolute"
        style={{ fontSize: fontSize + "px", fontWeight: "bold" }}
      >
        {text}
      </div>
    </div>
  );
}

export default CenterButton;
