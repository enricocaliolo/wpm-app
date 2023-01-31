import useWordStore from "../stores/word_store";

export function Button() {
  const startTest = useWordStore((state) => state.startTest);

  return (
    <div className="btn-container">
      <button className="btn" type="button" onClick={startTest}>
        Start again
      </button>
    </div>
  );
}
