import Colors from "../../config/Colors";

interface Props {
  groups: string[];
  selectedGroup: number;
  setSelectedGroup: (i: number) => void;
}

function GroupSelect({ selectedGroup, setSelectedGroup, groups }: Props) {
  return (
    <div className="d-flex justify-content-center mt-2">
      <div className="btn-group">
        {groups.map((name, i) => (
          <div
            className="btn"
            style={{
              backgroundColor:
                i === selectedGroup ? Colors.gold : Colors.tertiary,
              width: "120px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: Colors.dark,
            }}
            onClick={() => setSelectedGroup(i)}
            key={i}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupSelect;
