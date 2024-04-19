import { Form } from "@remix-run/react";
import { Input } from "react-aria-components";
import Tile from "~/components/Tile";
import Modal from "~/components/Modal";
import GameResultModal from "~/components/GameResultsModal";
import { useGame } from "~/hooks/useGame";

function WordTiles() {
  const {
    tiles,
    inputValue,
    modalState,
    inputRef,
    handleInputChange,
    handleSubmit,
    resetGame,
  } = useGame();

  return (
    <>
      <div className="absolute left-1/2 translate-x-[-50%] w-full sm:w-auto top-1/5 md:top-[160px]">
        <Form onSubmit={handleSubmit}>
          <Input
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
