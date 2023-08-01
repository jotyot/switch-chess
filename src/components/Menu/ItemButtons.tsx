import Colors from "../../config/Colors";
import { useState } from "react";
import PasswordPrompt from "./PasswordPrompt";

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
  const width = 240;
  const [locks, setLocks] = useState<boolean[]>([
    false,
    ...Array(groups.length - 1).fill(true),
  ]);
  const [prompt, setPrompt] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let code: string;
    if (event.key === "Enter") {
      code = event.currentTarget.value;
      if (code === "neon") {
        let newLocks = locks;
        newLocks[1] = false;
        setLocks(newLocks);
        setPrompt(false);
      }
      if (code === "notroyal") {
        let newLocks = locks;
        newLocks[2] = false;
        setLocks(newLocks);
        setPrompt(false);
      }
    }
  };

  return (
    <div>
      <PasswordPrompt out={prompt} onKeyDown={handleKeyDown} />
      <div className="d-flex justify-content-center mt-2">
        <div className="btn-group">
          {groups.map((item, i) => (
            <div
              className="btn"
              style={{
                backgroundColor:
                  i === selectedItem
                    ? Colors.primary
                    : locks[i]
                    ? Colors.light
                    : Colors.tertiary,
                width: width / groups.length + "px",
              }}
              onClick={
                locks[i]
                  ? () => setPrompt(!prompt)
                  : () => {
                      setSelectedItem(i);
                      setSelected(groups[i]);
                    }
              }
              key={i}
            >
              {"name" in item && typeof item.name === "string"
                ? item.name
                : "error"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ItemButtons;
