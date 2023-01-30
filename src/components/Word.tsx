type WordProp = {
  word: string;
  isCorrect?: boolean;
};

export function Word({ word, isCorrect }: WordProp) {
  if (isCorrect !== undefined) {
    return (
      <span
        className={`${isCorrect ? "word" : "word incorrect-submitted-word"}`}
      >
        {word}
      </span>
    );
  } else {
    return <span className="word">{word}</span>;
  }
}
