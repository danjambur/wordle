import { useWord } from "~/hooks/useWord";
import Tile from "~/components/Tile";
import { useState, useEffect, useRef } from "react";
import { Form } from "@remix-run/react";
import { Input } from "react-aria-components";
import { Tiles, ModalState, LetterStatus } from "~/types";
import Modal from "~/components/Modal";
import GameResultModal from "~/components/GameResultsModal";

function WordTiles() {
  const answer = useWord();
  const [tiles, setTiles] = useState<Tiles>(createInitialTiles());
  const [currentRow, setCurrentRow] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [modalState, setModalState] = useState<ModalState>({
    showModal: false,
    isSuccess: false,
  });

  const inputRef = useRef(null);

  // we always want to maintain focus.
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // if a user clicks away (i.e. to their browser search bar) from the input field, we want to make sure that the input field is focused again.
  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const handleBlur = () => {
        inputElement.focus();
      };
      inputElement.addEventListener("blur", handleBlur);
      return () => {
        inputElement.removeEventListener("blur", handleBlur);
      };
    }
  }, []);

  const countOccurrences = (str: string, char: string): number => {
    return str.split("").filter((c) => c === char).length;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // it would also be good to validate the input to make sure that numbers / and other characters are not entered.
    setInputValue(event.target.value);
    const guess = event.target.value.toUpperCase().split("");
    setTiles((prevTiles) => updateTilesWithGuess(prevTiles, guess));
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const guess = inputValue.toUpperCase().split("");
    if (guess.length !== 5) {
      return;
    }
    setTiles((prevTiles) => updateTilesWithGuess(prevTiles, guess, true));
    setCurrentRow(currentRow + 1);
    setInputValue("");
    if (guess.join("") === answer) {
      setModalState({ showModal: true, isSuccess: true });
    } else if (currentRow === tiles.length - 1) {
      setModalState({ showModal: true, isSuccess: false });
    }
  };

  // Initialise `tiles` as a 5x5 grid with empty strings.
  // We use `Array(5).fill(0).map(() => Array(5).fill(""))` to create unique arrays for each row.
  // This prevents updates to one row from affecting all rows due to shared memory references in JS.
  function createInitialTiles(): Tiles {
    return new Array(5)
      .fill(0)
      .map(() => new Array(5).fill({ char: "", status: LetterStatus.Neutral }));
  }

  function updateTilesWithGuess(
    prevTiles: Tiles,
    guess: string[],
    updateStatus = false
  ): Tiles {
    const newTiles = [...prevTiles];
    for (let i = 0; i < 5; i++) {
      const char = guess[i] || "";
      newTiles[currentRow][i] = {
        char,
        status: updateStatus
          ? getTileStatus(char, i, guess)
          : newTiles[currentRow][i].status,
      };
    }
    return newTiles;
  }

  function getTileStatus(
    char: string,
    index: number,
    guess: string[]
  ): LetterStatus {
    if (char === answer[index]) {
      return LetterStatus.Correct;
    }
    if (
      answer.includes(char) &&
      countOccurrences(guess.slice(0, index + 1).join(""), char) <=
        countOccurrences(answer.slice(0, index + 1), char)
    ) {
      return LetterStatus.Miss;
    }
    return LetterStatus.Absent;
  }
  const resetGame = () => {
    setModalState({ showModal: false, isSuccess: false });
    setCurrentRow(0);
    setInputValue("");
    setTiles(createInitialTiles());
  };

  return (
    <>
      <div className="absolute left-1/2 translate-x-[-50%] w-full sm:w-auto top-1/5 md:top-[160px]">
        <Form onSubmit={handleSubmit}>
          <Input
            //  we want to make sure the user focuses this input using the ref, and the useEffect.
            ref={inputRef}
            type="text"
            maxLength={5}
            value={inputValue}
            onChange={handleInputChange}
            className="bg-transparent border-0 outline-none h-0 w-0 opacity-0"
            aria-label="Enter your guess"
          />
          <div className="justify-center items-center">
            {tiles.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-5 gap-x-[10px]">
                {row.map((tile, colIndex) => (
                  <Tile key={colIndex} status={tile.status}>
                    {tile.char}
                  </Tile>
                ))}
              </div>
            ))}
          </div>
        </Form>
      </div>

      <Modal
        isOpen={modalState.showModal}
        onOpenChange={resetGame}
        isDismissable
      >
        {modalState.showModal &&
          (modalState.isSuccess ? (
            <GameResultModal
              resetGame={resetGame}
              emoji="🏆"
              title="You're a Winner, Champ!"
              message="Congrats! You've just crushed it and won the game. Now, bask in your glory and celebrate like a boss! 🎉"
            />
          ) : (
            <GameResultModal
              resetGame={resetGame}
              emoji="🙈"
              title="Oops! Tough Luck, But Don't Give Up!"
              message="You didn't quite make it this time, but hey, no worries! Give it another shot, and who knows, the next round might be your moment of glory! Keep going, champ! 💪🎮"
            />
          ))}
      </Modal>
    </>
  );
}

export default WordTiles;
