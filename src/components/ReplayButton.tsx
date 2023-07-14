import Colors from "../config/Colors";

interface Props {
  width: number;
  winner: string; // winner ? white : black
  onClick: () => void;
}

function ReplayButton({ winner, width, onClick }: Props) {
  return (
    <div
      className="container position-absolute translate-middle start-50 top-50 rounded"
      style={{
        width: width + "px",
        height: width / 3 + "px",
        backgroundColor: Colors.primary,
      }}
    >
      <h1 className="position-absolute translate-middle-y top-50 mx-1">
        {winner ? winner + " Wins" : "Draw"}
      </h1>
      <button
        className="position-absolute translate-middle-y top-50 end-0 rounded btn mx-3 text-center fs-1 fw-bold"
        style={{
          width: width / 4,
          height: width / 4,
          backgroundColor: Colors.secondary,
        }}
        onClick={onClick}
      >
        ↺
      </button>
    </div>
  );
}

export default ReplayButton;
