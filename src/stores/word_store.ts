import { create } from "zustand";
import { text } from "../data/text";

interface WordState {
  text: string;
  wordWritten: string;
  wordSubmitted: { word: string; isCorrect: boolean }[];
  changeWordFlag: boolean;
  isCorrect: boolean;
  score: number;
  currentWord: string;

  changeText: () => void;
  setWordWritten: (text: string) => void;
  addWordSubmitted: (word: string, isCorrect: boolean) => void;
  changeWord: () => void;
  setIsCorrect: (value: boolean) => void;
  increaseScore: () => void;
  setCurrentWord: (word: string) => void;
}

const useWordStore = create<WordState>()((set) => ({
  // text: text[Math.floor(Math.random() * text.length)],
  text: text[0],
  wordWritten: "",
  wordSubmitted: [],
  changeWordFlag: false,
  isCorrect: false,
  score: 0,
  currentWord: "",

  changeText: () =>
    set(() => ({ text: text[Math.floor(Math.random() * text.length)] })),

  setWordWritten: (text: string) => set(() => ({ wordWritten: text })),

  addWordSubmitted: (word: string, isCorrect: boolean) =>
    set((state) => ({
      wordSubmitted: [...state.wordSubmitted, { word, isCorrect }],
    })),

  changeWord: () => set((state) => ({ changeWordFlag: !state.changeWordFlag })),

  setIsCorrect: (value: boolean) => set(() => ({ isCorrect: value })),

  increaseScore: () => set((state) => ({ score: state.score + 1 })),

  setCurrentWord: (word: string) => set(() => ({ currentWord: word })),
}));

export default useWordStore;
