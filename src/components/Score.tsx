import useWordStore from "../stores/word_store";

export function Score() {
  const score = useWordStore((state) => state.score);

  return (
    <section className="box">
      <p>{score}</p>
    </section>
  );
}
