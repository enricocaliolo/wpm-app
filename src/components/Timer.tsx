import useWordStore from "../stores/word_store";

export function Timer() {
  const score = useWordStore((state) => state.score);

  return <h1>{score}</h1>;
}
