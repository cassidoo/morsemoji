import React, { useState } from "react";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function EmojiPicker({ dot, setDot, dash, setDash }) {
  const [showPicker, setShowPicker] = useState(false);
  const [dotOrDash, setDotOrDash] = useState("dot");

  return (
    <>
      <button
        onClick={() => {
          setDotOrDash("dot");
          setShowPicker(true);
        }}
      >
        {dot === "" ? "Pick yer dot" : `Dot: ${dot}`}
      </button>
      <button
        onClick={() => {
          setDotOrDash("dash");
          setShowPicker(true);
        }}
      >
        {dash === "" ? "Pick yer dash" : `Dash: ${dash}`}
      </button>
      {showPicker && (
        <>
          <p>Picking a {dotOrDash}...</p>
          <Picker
            onSelect={(event) => {
              if (dotOrDash === "dot") {
                setDot(event.native);
              } else {
                setDash(event.native);
              }
              setShowPicker(false);
            }}
          />
        </>
      )}
    </>
  );
}

export default EmojiPicker;
