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
  const codes = ["neon", "notroyal"];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let input: string;
    if (event.key !== "Enter") return;

    input = event.currentTarget.value;
    for (let i = 0; i < codes.length; i++)
      if (input === codes[i]) {
        let newLocks = locks;
        newLocks[i + 1] = false;
        setLocks(newLocks);
        setPrompt(false);
        setSelectedItem(i + 1);
        setSelected(groups[i + 1]);
      }
  };

  return (
    <div>
      <PasswordPrompt out={prompt} onKeyDown={handleKeyDown} />
      <div className="d-flex justify-content-center">
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
