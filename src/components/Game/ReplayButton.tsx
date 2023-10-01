import { Opponent } from "../../classes/Opponent";
import Colors from "../../config/Colors";

interface Props {
  width: number;
  status: "win" | "lose" | "draw";
  opponent: Opponent;
  onClick: () => void;
}

/**
 * A ui element that shows up to reset the board when there is a winner/draw
 * @param width width of the ui element in px
 * @param winner "White" "Black" ""
 * @param onClick function thatexecutes when you press the button
 * @returns A JSX element of the replay button
 */
function ReplayButton({ status, opponent, width, onClick }: Props) {
  const title = () => {
    switch (status) {
      case "draw":
        return "Draw";
      case "win":
        return opponent.name === "offline" ? "Player 1 Wins" : "Victory";
      case "lose":
        return opponent.name === "offline" ? "Player 2 Wins" : "Defeat";
    }
  };

  const color = () => {
    switch (status) {
      case "draw":
        return Colors.tertiary;
      case "win":
        return Colors.cyan;
      case "lose":
        return Colors.pink;
    }
  };

  return (
    <div
      className="position-absolute translate-middle start-50 top-50 rounded"
      style={{
        width: width + "px",
        height: width / 1.5 + "px",
        backgroundColor: Colors.secondary,
        borderStyle: "solid",
        borderWidth: "3px",
        borderColor: Colors.dark,
        overflow: "hidden",
      }}
    >
      <div
        className="d-flex position-relative justify-content-center"
        style={{ fontSize: "30px", fontWeight: "bold" }}
      >
        {title()}
      </div>
      <div
        className="d-flex position-relative justify-content-center text-center"
        style={{ fontSize: "15px" }}
      >
        {status === "win" ? opponent.message : "another go?"}
      </div>
      <div
        className="d-flex position-relative justify-content-center mt-2"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color(),
          borderTopStyle: "solid",
          borderWidth: "1px",
          borderColor: Colors.dark,
        }}
      >
        <div className="mt-3">
          <div
            className="rounded btn d-flex align-items-center justify-content-center"
            style={{
              width: width / 2,
              height: width / 5,
              backgroundColor: Colors.secondary,
              fontSize: "15px",
              fontWeight: "bold",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: Colors.dark,
            }}
            onClick={onClick}
          >
            play again
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReplayButton;
