import Colors from "../../config/Colors";

interface Props {
  width: number;
  winner: string; // winner ? white : black
  onClick: () => void;
}

/**
 * A ui element that shows up to reset the board when there is a winner/draw
 * @param width width of the ui element in px
 * @param winner "White" "Black" ""
 * @param onClick function thatexecutes when you press the button
 * @returns A JSX element of the replay button
 */
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
      <div
        className="position-absolute translate-middle-y top-50 mx-1"
        style={{ fontSize: "25px" }}
      >
        {winner ? winner + " Wins" : "Draw"}
      </div>
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
