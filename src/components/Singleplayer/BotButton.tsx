interface Props {
  color: string;
  label: number;
  onClick: () => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

function BotButton({ color, label, onClick, onMouseOver, onMouseOut }: Props) {
  const squareSize = 120;

  return (
    <div
      className="rounded btn hover m-2"
      style={{
        width: squareSize + "px",
        height: squareSize + "px",
        backgroundColor: color,
      }}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {label}
    </div>
  );
}

export default BotButton;
