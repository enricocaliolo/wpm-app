import { ChangeEvent, useState } from "react";
import useWordStore from "../stores/word_store";
import { IWordSubmitted } from "../interfaces";

type InputProps = {
  childInputRef: any;
};

export function Input({ childInputRef }: InputProps) {
  const isCorrect = useWordStore((state) => state.isCorrect);
  const currentWord = useWordStore((state) => state.currentWord);

  const setWordWritten = useWordStore((state) => state.setWordWritten);
  const changeWord = useWordStore((state) => state.changeWord);
  const addWordSubmitted = useWordStore((state) => state.addWordSubmitted);
  const increaseScore = useWordStore((state) => state.increaseScore);

  const [isEnterKey, setIsEnterKey] = useState(false);

  const checkWord = (currentWord: string, wordSubmitted: string): boolean => {
    if (currentWord === wordSubmitted) {
      increaseScore();
      return true;
    } else {
      return false;
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    // check if the current inner text is either a backspace or a enter key
    if (
      e.currentTarget.innerText === String.fromCharCode(160) ||
      e.currentTarget.children.length === 2
    ) {
      e.currentTarget.innerText = "";
      setIsEnterKey(false);
    } // check if, while writing a word, either backspace or enter key was pressed, submitting the word
    else if (
      e.currentTarget.innerText !== "" &&
      (e.currentTarget.innerText.match(/\s/) || isEnterKey)
    ) {
      const word = e.currentTarget.innerText.slice(0, -1);
      if (checkWord(currentWord, word)) {
        addWordSubmitted(word, true);
      } else {
        addWordSubmitted(word, false);
      }
      setWordWritten(" ");
      changeWord();
      e.currentTarget.innerText = "";
      setIsEnterKey(false);
    } else {
      setWordWritten(e.currentTarget.innerText);
    }
  };

  return (
    <div
      className={`${
        isCorrect
          ? "content-editable correct-word"
          : "content-editable incorrect-word"
      }`}
      contentEditable={true}
      onInput={(e: ChangeEvent<HTMLInputElement>) => handleInput(e)}
      onKeyDown={(e) => {
        if (e.key === "Enter") setIsEnterKey(true);
      }}
      ref={childInputRef}
    ></div>
  );
}
