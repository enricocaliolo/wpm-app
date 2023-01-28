import { create } from "zustand";
import { text } from "../data/text";

interface WordState {
  text: string;
  wordWritten: string;
  wordSubmitted: string[];
  changeWordFlag: boolean;
  isCorrect: boolean;
  score: number;

  changeText: (paragraph: number) => void;
  setWordWritten: (text: string) => void;
  addWordSubmitted: (text: string) => void;
  changeWord: () => void;
  setIsCorrect: (value: boolean) => void;
  increaseScore: () => void;
}

const useWordStore = create<WordState>()((set) => ({
  text: text[0],
  wordWritten: "",
  wordSubmitted: [],
  changeWordFlag: false,
  isCorrect: false,
  score: 0,

  changeText: (paragraph: number) => set(() => ({ text: text[paragraph] })),

  setWordWritten: (text: string) => set(() => ({ wordWritten: text })),

  addWordSubmitted: (word: string) =>
    set((state) => ({ wordSubmitted: [...state.wordSubmitted, word] })),

  changeWord: () => set((state) => ({ changeWordFlag: !state.changeWordFlag })),

  setIsCorrect: (value: boolean) => set(() => ({ isCorrect: value })),

  increaseScore: () => set((state) => ({ score: state.score + 1 })),
}));

export default useWordStore;
