interface Props<T> {
  list: T[];
  offset?: number;
  selectedItem: number;
  setSelectedItem: (i: number) => void;
  setSelected: (i: T) => void;
  toggleGame?: () => void;
}

function ItemCards<T>({
  list,
  offset = 0,
  selectedItem,
  setSelectedItem,
  setSelected,
  toggleGame = () => {},
}: Props<T>) {
  const size = 75;
  const small = 60;
  const colors = ["red", "green", "blue"];

  return (
    <div className="d-flex justify-content-center position-relative mt-3">
      {list.map((opp, i) => (
        <div
          className="d-flex justify-content-center"
          style={{
            width: size + "px",
            height: size + "px",
          }}
        >
          <div
            className="btn rounded position-relative translate-middle-y top-50"
            style={{
              width: (i + offset === selectedItem ? size : small) + "px",
              height: (i + offset === selectedItem ? size : small) + "px",
              backgroundColor: colors[i],
              transitionProperty: "all",
              transitionDuration: "0.05s",
            }}
            onClick={() => {
              setSelectedItem(i + offset);
              setSelected(opp);
              if (i + offset === selectedItem) toggleGame();
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default ItemCards;
