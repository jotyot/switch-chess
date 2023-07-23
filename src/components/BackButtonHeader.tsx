import BackButton from "./BackButton";

interface Props {
  width: number;
  height: number;
  onClick?: () => void;
  headerText?: string;
  hasText?: boolean;
}

function BackButtonHeader({
  width,
  height,
  onClick = () => {},
  headerText,
  hasText = false,
}: Props) {
  return (
    <div
      className="container position-relative my-2"
      style={{ width: width + "px", height: height + "px" }}
    >
      <BackButton height={height} onClick={onClick} />
      {hasText && (
        <div
          className="text-center position-relative"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            pointerEvents: "none",
          }}
        >
          {headerText}
        </div>
      )}
    </div>
  );
}

export default BackButtonHeader;
