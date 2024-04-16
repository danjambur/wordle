import { useLoaderData } from "@remix-run/react";

export function useWord() {
  const word = useLoaderData();
  const wordled = word[0].toUpperCase().split("");
  return wordled;
}
