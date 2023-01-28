import useWordStore from "../stores/word_store";
import { Word } from "../components";
import { useEffect, useRef, useState } from "react";
import { IWordSubmitted } from "../interfaces";

export function WordList() {
  const text = useWordStore((state) => state.text);

  const wordWritten = useWordStore((state) => state.wordWritten);
  const changeWordFlag = useWordStore((state) => state.changeWordFlag);
  const isCorrect = useWordStore((state) => state.isCorrect);
  const wordSubmitted = useWordStore((state) => state.wordSubmitted);
  const increaseScore = useWordStore((state) => state.increaseScore);

  const changeWord = useWordStore((state) => state.changeWord);
  const setIsCorrect = useWordStore((state) => state.setIsCorrect);

  const [textToBeDisplayed, setTextToBeDisplayed] = useState([
    ...text.split(" "),
  ]);
  const [currentWord, setCurrentWord] = useState(textToBeDisplayed[0]);

  const checkWord = (currentWord: string, wordSubmitted: string) => {
    if (currentWord === wordSubmitted) {
      increaseScore();
    } else {
    }
  };

  const checkSpelling = (wordWritten: string) => {
    // checks if string written is the same
    if (
      wordWritten !== "" &&
      wordWritten === currentWord.slice(0, wordWritten.length)
    ) {
      if (!isCorrect) {
        setIsCorrect(true);
      }
      // removes letters written correctly from text
      const newWord = currentWord.slice(wordWritten.length, currentWord.length);

      let tempText = [...textToBeDisplayed];
      tempText[0] = newWord;

      setTextToBeDisplayed(() => tempText);
    } else {
      setIsCorrect(false);
    }
  };

  // checks when user press space, meaning they submitted a word
  useEffect(() => {
    if (changeWordFlag) {
      textToBeDisplayed.shift();
      setCurrentWord(textToBeDisplayed[0]);
      changeWord();
    }

    checkWord(currentWord, wordSubmitted[wordSubmitted.length - 1]);
  }, [wordSubmitted]);

  // check spelling of the word as the user types
  useEffect(() => {
    checkSpelling(wordWritten);
  }, [wordWritten]);

  return (
    <div className="words">
      {textToBeDisplayed.map((word, index) => {
        return <Word key={index} word={word} />;
      })}
    </div>
  );
}
