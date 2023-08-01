import React, { useState } from "react";

interface Props {
  out: boolean;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

function PasswordPrompt({ out, onKeyDown }: Props) {
  const [visible, setVisible] = useState(false);
  if (out && !visible) setVisible(true);
  else if (!out && visible) setTimeout(() => setVisible(!visible), 20);

  return (
    <div className="position-absolute translate-middle-x start-50">
      <input
        className="form-control"
        placeholder="Defeat the bots for skin codes"
        style={{
          width: "240px",
          marginTop: (out ? -45 : 0) + "px",
          transitionProperty: "all",
          transitionDuration: "0.2s",
          visibility: visible ? "visible" : "hidden",
        }}
        onKeyDown={onKeyDown}
      ></input>
    </div>
  );
}

export default PasswordPrompt;
