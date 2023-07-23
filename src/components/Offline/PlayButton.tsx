import Colors from "../../config/Colors";

interface Props {
  onClick?: () => void;
}

function PlayButton({ onClick = () => {} }: Props) {
  const width = 300;
  const height = 100;
  const fontSize = 30;

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
        Play
      </div>
    </div>
  );
}

export default PlayButton;
