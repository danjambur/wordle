import { useGrid } from "@react-aria/grid";
import { mergeProps } from "@react-aria/utils";
import Input from "./Input";
import { useState } from "react";

function InputGroup(props) {
  const [guess, setGuess] = useState(Array(5).fill("")); // Initialise guess as an array of 5 empty strings
  const [correctWord, setCorrectWord] = useState("apple"); // Initialize correctWord as "apple"

  const handleKeyDown = (e) => {
    console.log(e.key);

    if (e.key.length === 1 && !/^[A-Za-z]$/.test(e.key)) {
      e.preventDefault();
    } else if (e.key === "Backspace") {
      // Implement your backspace logic here
      console.log("backspace");
    } else if (e.key === "Enter") {
      validateGuess();
    }
  };

  const validateGuess = () => {
    // validate the guess
  };

  return (
    <div onKeyDown={handleKeyDown}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Input
          key={i}
          value={guess[i] || ""}
          onChange={(value) => {
            const newGuess = guess.split("");
            newGuess[i] = value;
            setGuess(newGuess.join(""));
          }}
          isCorrectGuess={guess[i] === correctWord[i]}
          isCorrectLetter={correctWord.includes(guess[i])}
        />
      ))}
    </div>
  );
}

export default InputGroup;
