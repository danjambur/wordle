import React, { useRef } from "react";
import { useTextField } from "@react-aria/textfield";
import { useFocusRing } from "@react-aria/focus";
// import { vars } from "./styles.css";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  isCorrectGuess: boolean;
  isCorrectLetter: boolean;
};

function Input({ value, isCorrectGuess, isCorrectLetter }: InputProps) {
  const ref = useRef(null);
  const { inputProps, labelProps } = useTextField(
    {
      value,
      onChange: (e) => console.log(e),
      "aria-label": "Wordle Input",
    },
    ref
  );
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <div>
      <label {...labelProps}>Guess:</label>
      <input
        {...inputProps}
        {...focusProps}
        // className={inputClass.input}
        style={{ outline: isFocusVisible ? "auto" : "none" }}
      />
    </div>
  );
}

export default Input;
