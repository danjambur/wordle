import type { MetaFunction } from "@remix-run/node";
import { useLocale } from "react-aria-components";
import { useEffect, useState } from "react";
import { useLoaderData, useActionData } from "@remix-run/react";
import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
import { WordTiles } from "~/components/WordTiles";

import Grid from "~/components/Grid";
import Modal from "~/components/Modal";
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
    // Handle errors here
    console.error("Fetch Error: ", error);
    return json({ error: error.message }, { status: 500 });
  }
};

export const action: ActionFunction = async ({ request }) => {
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
    // Handle errors here
    console.error("Fetch Error: ", error);
    return json({ error: error.message }, { status: 500 });
  }
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
        <WordTiles />
      </Grid>
    </div>
  );
}
