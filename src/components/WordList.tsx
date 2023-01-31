import useWordStore from "../stores/word_store";
import { Word } from "../components";
import { useEffect, useRef, useState } from "react";
// import { text } from "../data/text";

export function WordList() {
  const text = useWordStore((state) => state.text);
  const wordWritten = useWordStore((state) => state.wordWritten);
  const changeWordFlag = useWordStore((state) => state.changeWordFlag);
  const isCorrect = useWordStore((state) => state.isCorrect);
  const wordSubmitted = useWordStore((state) => state.wordSubmitted);
  const currentWord = useWordStore((state) => state.currentWord);

  const changeWord = useWordStore((state) => state.changeWord);
  const setIsCorrect = useWordStore((state) => state.setIsCorrect);
  const setCurrentWord = useWordStore((state) => state.setCurrentWord);
  const changeText = useWordStore((state) => state.changeText);
  const setText = useWordStore((state) => state.setText);

  // const [text, setTextToBeDisplayed] = useState([
  //   ...text.split(" "),
  // ]);

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

      let tempText = [...text];
      tempText[0] = newWord;

      setText(tempText);
    } else {
      setIsCorrect(false);
    }
  };

  useEffect(() => {
    setCurrentWord(text[0]);
  }, []);

  // checks when user press space, meaning they submitted a word
  useEffect(() => {
    if (changeWordFlag) {
      text.shift();
      if (text.length === 0) {
        changeText();
      }
      setCurrentWord(text[0]);
      changeWord();
    }
  }, [wordSubmitted]);

  // check spelling of the word as the user types
  useEffect(() => {
    checkSpelling(wordWritten);
  }, [wordWritten]);

  return (
    <div className="words">
      {text.map((word, index) => {
        return <Word key={index} word={word} />;
      })}
    </div>
  );
}
