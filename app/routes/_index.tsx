import type { MetaFunction } from "@remix-run/node";
import { useLocale } from "react-aria-components";
import Grid from "~/components/Grid";
import Tile from "~/components/Tile";
import Modal from "~/components/Modal";
export const meta: MetaFunction = () => {
  return [
    { title: "Wordle | Remix Wordle Game" },
    { name: "description", content: "Welcome to Wordle! Guess the word!" },
  ];
};

export default function Index() {
  // CV Maker needs to support multiple languages and directions
  const { locale, direction } = useLocale();
  return (
    <div
      lang={locale}
      dir={direction}
      className="bg-gradient-to-b from-[#212226] to-[#000000] text-white min-h-screen"
    >
      <Grid>
        <Tile status="correct">W</Tile>
        <Tile status="correct">O</Tile>
        <Tile status="correct">R</Tile>
        <Tile status="correct">D</Tile>
        <Tile status="correct">L</Tile>
      </Grid>
    </div>
  );
}
