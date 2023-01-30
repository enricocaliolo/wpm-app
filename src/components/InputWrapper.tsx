import { useRef } from "react";
import useWordStore from "../stores/word_store";
import { Word, WordList, Input } from ".";

export function InputWrapper() {
  const wordSubmitted = useWordStore((state) => state.wordSubmitted);

  const childInputRef = useRef<HTMLInputElement>(null);

  const focusChild = () => {
    childInputRef.current && childInputRef.current.focus();
  };

  return (
    <div className="input-wrapper" onClick={focusChild}>
      <div className="past-input">
        {wordSubmitted.length > 0 &&
          wordSubmitted.map((word, index) => (
            <Word key={index} word={word.word} isCorrect={word.isCorrect} />
          ))}
        <Input childInputRef={childInputRef} />
      </div>
      <div className="input-container">
        <WordList />
      </div>
    </div>
  );
}
