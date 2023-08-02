import Colors from "../../config/Colors";
interface Props {
  top: number;
  width: number;
}
function Line({ top, width }: Props) {
  return (
    <div
      className="position-relative translate-middle-x start-50 rounded"
      style={{
        top: top + "px",
        width: width + "px",
        height: "0px",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: Colors.dark,
      }}
    ></div>
  );
}

export default Line;
