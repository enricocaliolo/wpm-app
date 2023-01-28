type WordProp = {
  word: string;
};

export function Word({ word }: WordProp) {
  return <span className="word">{word}</span>;
}
