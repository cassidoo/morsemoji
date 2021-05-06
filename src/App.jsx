import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import EmojiPicker from "./EmojiPicker";

// Thanks to https://gist.github.com/mohayonao/094c71af14fe4791c5dd
import dict from "./dictionary.json";
import "./App.css";

function translate(character, dot, dash, setError) {
  const translatedict = {
    "-": dash || "-",
    ".": dot || ".",
  };

  if (!dict[character]) {
    setError(
      "Please use a valid alphanumeric character, or basic punctuation, or ELSE."
    );
    return null;
  }

  let m = dict[character]
    .split("")
    .map((s) => translatedict[s])
    .join("");

  return m + " ";
}

function useMorse(text, dot, dash, setError) {
  const [morseString, setMorseString] = useState("");

  useEffect(() => {
    setMorseString(
      text
        .split("")
        .map((s) => {
          return translate(s, dot, dash, setError);
        })
        .join("")
    );
  }, [text, dot, dash]);

  return morseString;
}

function App() {
  const [text, setText] = useState("");
  const [dot, setDot] = useState("");
  const [dash, setDash] = useState("");
  const [error, setError] = useState();
  let morse = useMorse(text, dot, dash, setError);

  return (
    <div className="App">
      <h1>Morsemoji!</h1>
      <p>Convert text to morse code... with emojis!</p>

      <EmojiPicker dot={dot} setDot={setDot} dash={dash} setDash={setDash} />
      <br />
      <p>{error}</p>
      <input
        type="text"
        placeholder="Text to translate"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setError(null);
        }}
      />
      {!!morse.length && (
        <div className="copychunk">
          <p className="emojis">{morse}</p>
          <CopyToClipboard text={morse}>
            <button>Copy to Clipboard</button>
          </CopyToClipboard>
        </div>
      )}
    </div>
  );
}

export default App;
