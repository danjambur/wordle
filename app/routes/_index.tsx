import type { MetaFunction } from "@remix-run/node";
import { useLocale } from "react-aria-components";
import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import WordTiles from "~/components/WordTiles";
import { ModalProvider } from "@react-aria/overlays";
import Grid from "~/components/Grid";
import type { GameStatus, CharGuess } from "~/types";
export const meta: MetaFunction = () => {
  return [
    { title: "Wordle | Remix Wordle Game" },
    { name: "description", content: "Welcome to Wordle! Guess the word!" },
  ];
};

export const loader: LoaderFunction = async () => {
  try {
    let res = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5"
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await res.json();
    return json(data);
  } catch (error) {
    console.error("Fetch Error: ", error);
    return json({ error: error.message }, { status: 500 });
  }
};

export default function Index() {
  // CV Maker needs to support multiple languages and directions
  const { locale, direction } = useLocale();
  const loaderData = useLoaderData();

  if (loaderData.error) {
    return (
      <div
        lang={locale}
        dir={direction}
        className="bg-gradient-to-b from-[#212226] to-[#000000] text-white min-h-screen"
      >
        <Grid>
          {/* this could be replaced with i18n and based on the locale, get the error message from the language.json file */}
          <p>
            Sorry, an error occurred while loading the game. Please try again
            later.
          </p>
        </Grid>
      </div>
    );
  }
  return (
    <div
      lang={locale}
      dir={direction}
      className="bg-gradient-to-b from-[#212226] to-[#000000] text-white min-h-screen"
    >
      <ModalProvider>
        <Grid>
          <WordTiles />
        </Grid>
      </ModalProvider>
    </div>
  );
}
