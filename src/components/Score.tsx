import useWordStore from "../stores/word_store";

export function Score() {
  const score = useWordStore((state) => state.score);

  return (
    <div className="box-container">
      <h2>Score</h2>
      <div className="box">{score}</div>
    </div>
  );
}
