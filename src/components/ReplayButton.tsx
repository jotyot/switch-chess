interface Props {
  top: number;
  width: number;
  winner: boolean; // winner ? white : black
}

function ReplayButton({ top, winner, width }: Props) {
  return (
    <div
      className="container position-relative rounded my-2"
      style={{
        width: width + "px",
        height: width / 3 + "px",
        backgroundColor: "var(--bs-info-bg-subtle)",
        top: top + "px",
      }}
    >
      <div className="position-absolute">{winner ? "White" : "Black"}</div>
    </div>
  );
}

export default ReplayButton;
