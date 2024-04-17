import { useWord } from "~/hooks/useWord";
import Tile from "~/components/Tile";
import { LetterStatus } from "~/types";
import { useState } from "react";
import { Form } from "@remix-run/react";

export function WordTiles() {
  const answer = useWord();

  // Initialise `tiles` as a 5x5 grid with empty strings.
  // We use `Array(5).fill(0).map(() => Array(5).fill(""))` to create unique arrays for each row.
  // This prevents updates to one row from affecting all rows due to shared memory references in JS.

  const [tiles, setTiles] = useState(
    new Array(5).fill(0).map(() => new Array(5).fill(""))
  );

  const [currentRow, setCurrentRow] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    const guess = inputValue.split("");
    if (guess.length !== 5) {
      return;
    }
    tiles[currentRow].forEach((char, index) => {
      if (char === "") {
        setTiles((prevTiles) => {
          const newTiles = [...prevTiles];
          newTiles[currentRow][index] = guess[index];
          return newTiles;
        });
      }
    });
    setCurrentRow(currentRow + 1);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength={5}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="text-black"
        />
        <div className="justify-center items-center">
          {tiles.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-x-[10px]">
              {row.map((char, colIndex) => (
                <Tile key={colIndex} tabIndex={colIndex} status={"neutral"}>
                  {char}
                </Tile>
              ))}
            </div>
          ))}
        </div>
      </Form>
    </>
  );
}
