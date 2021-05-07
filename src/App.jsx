import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import EmojiPicker from "./EmojiPicker";

import useMorse from "./useMorse";

import logo from "./logo.png";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [dot, setDot] = useState("");
  const [dash, setDash] = useState("");
  const [error, setError] = useState();
  let morse = useMorse(text, dot, dash, setError);

  return (
    <div className="App">
      <img src={logo} alt="Morsemoji!" />
      <p className="tagline">Convert text to morse code... with emojis!</p>

      <EmojiPicker dot={dot} setDot={setDot} dash={dash} setDash={setDash} />
      <br />
      <p>{error}</p>
      <input
        type="text"
        placeholder="Text to translate"
        value={text}
        onChange={(event) => {
          setText(event.target.value.toLowerCase());
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
