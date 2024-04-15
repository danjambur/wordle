import { createTheme, style } from "@vanilla-extract/css";

export const [themeClass, vars] = createTheme({
  color: {
    correctGuess: "green",
    correctLetter: "orange",
    default: "gray",
  },
});

const inputClass = style({
  input: {
    backgroundColor: isCorrectGuess
      ? vars.color.correctGuess
      : isCorrectLetter
      ? vars.color.correctLetter
      : vars.color.default,
  },
});
