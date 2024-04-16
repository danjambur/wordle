import { useWord } from "~/hooks/useWord";
import Tile from "~/components/Tile";
import { LetterStatus } from "~/types";
import { useState } from "react";

export function WordTiles() {
  const wordled = useWord();
  const [guesses, setGuesses] = useState<Array<Array<string>>>(
    Array(5).fill(Array(5).fill(""))
  );

  const checkStatus = (char: string, index: number): LetterStatus => {
    const guess = guesses[index];
    if (!guess) return LetterStatus.Absent;
    if (guess === char) return LetterStatus.Correct;
    if (wordled.includes(guess)) return LetterStatus.Miss;
    return LetterStatus.Absent;
  };

  return (
    <>
      {guesses.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((char, colIndex) => (
            <Tile
              key={colIndex}
              tabIndex={colIndex}
              status={checkStatus(char, colIndex)}
            >
              {char}
            </Tile>
          ))}
        </div>
      ))}
    </>
  );
}
