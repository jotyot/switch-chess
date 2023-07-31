interface Props<T> {
  groups: T[];
  selectedItem: number;
  setSelectedItem: (i: number) => void;
  setSelected: (o: T) => void;
}

function ItemButtons<T extends object>({
  selectedItem,
  setSelectedItem,
  setSelected,
  groups,
}: Props<T>) {
  return (
    <div className="d-flex justify-content-center mt-2">
      <div className="btn-group">
        {groups.map((item, i) => (
          <div
            className="btn"
            style={{
              backgroundColor: i === selectedItem ? "lightcoral" : "mintcream",
              width: "120px",
            }}
            onClick={() => {
              setSelectedItem(i);
              setSelected(groups[i]);
            }}
            key={i}
          >
            {"name" in item && typeof item.name === "string" ? item.name : "no"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemButtons;
