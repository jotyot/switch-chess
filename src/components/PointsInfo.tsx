import PiecePoints from "../config/PiecePoints";

interface Props {
  piece: string;
}

function PointsInfo({ piece }: Props) {
  const [p, o] = PiecePoints.get(piece) || [0, 0];
  return (
    <div>
      <div className="d-flex justify-content-center mt-3">
        {"capturing a " + piece.toLowerCase() + " gives"}
      </div>
      <div className="d-flex justify-content-center">
        {"+" + p + " to you" + (o === 0 ? "." : ", +" + o + " to opponent")}
      </div>
    </div>
  );
}

export default PointsInfo;
