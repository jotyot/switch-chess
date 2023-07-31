import Colors from "../config/Colors";

interface Props {
  text: string;
  onClick: () => void;
}
function ArrowButton({ text, onClick }: Props) {
  return (
    <div
      className="position-relative mx-2 d-flex justify-content-center rounded align-items-center hover btn"
      style={{
        width: "40px",
        height: "80px",
        backgroundColor: Colors.primary,
        fontWeight: "bold",
      }}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export default ArrowButton;
