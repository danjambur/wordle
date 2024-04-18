import { useLoaderData } from "@remix-run/react";

export function useWord() {
  const word: [string] = useLoaderData();
  const wordled = word[0].toUpperCase();
  return wordled;
}
