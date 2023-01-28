import React, {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import useWordStore from "../stores/word_store";
import { Word, WordList } from "../components";

export function Input() {
  const setWordWritten = useWordStore((state) => state.setWordWritten);
  const wordSubmitted = useWordStore((state) => state.wordSubmitted);
  const addWordSubmitted = useWordStore((state) => state.addWordSubmitted);
  const changeWord = useWordStore((state) => state.changeWord);
  const isCorrect = useWordStore((state) => state.isCorrect);

  const childInputRef = useRef<HTMLInputElement>(null);

  const [isEnterKey, setIsEnterKey] = useState(false);

  const focusChild = () => {
    childInputRef.current && childInputRef.current.focus();
  };

  // const checkWord = (currentWord: string, wordSubmitted: IWordSubmitted) => {
  //   if (currentWord === wordSubmitted.word) {
  //     increaseScore();
  //   } else {
  //   }
  // };

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
      addWordSubmitted(word);
      setWordWritten(" ");
      changeWord();
      e.currentTarget.innerText = "";
      setIsEnterKey(false);
    } else {
      setWordWritten(e.currentTarget.innerText);
    }
  };

  return (
    <div className="input-wrapper" onClick={focusChild}>
      <div className="past-input">
        {wordSubmitted.length > 0 &&
          wordSubmitted.map((word, index) => <Word key={index} word={word} />)}
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
      </div>
      <div className="input-container">
        <WordList />
      </div>
    </div>
  );
}
