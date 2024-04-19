import { Button } from "react-aria-components";

interface GameResultModalProps {
  isSuccess: boolean;
  resetGame: () => void;
  emoji: string;
  title: string;
  message: string;
}

const GameResultModal: React.FC<GameResultModalProps> = ({
  resetGame,
  emoji,
  title,
  message,
}) => {
  return (
    <div className="flex flex-col items-center text-center p-5 gap-4">
      <h1 className="text-[64px] font-bold">{emoji}</h1>
      <h2 className="font-extrabold">{title}</h2>
      <p className="text-lg mb-2">{message}</p>
      <Button
        onPress={resetGame}
        className="bg-gradient-to-b p-6 rounded text-white text-sm leading-4 flex items-center justify-center bg-[#007AFF] w-full"
      >
        Try again
      </Button>
    </div>
  );
};

export default GameResultModal;
