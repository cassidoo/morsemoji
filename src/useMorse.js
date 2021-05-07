import { useState, useEffect } from "react";

// Thanks to https://gist.github.com/mohayonao/094c71af14fe4791c5dd
import dict from "./dictionary.json";

export default function useMorse(text, dot, dash, setError) {
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
