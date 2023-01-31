import { useEffect, useRef, useState } from "react";
import useWordStore from "../stores/word_store";

export function Timer() {
  const flagStartTest = useWordStore((state) => state.flagStartTest);

  const finishTest = useWordStore((state) => state.finishTest);

  let timerIdRef = useRef(0);

  const timeOfTimer: number = 60;

  const [timer, setTimer] = useState(timeOfTimer);

  useEffect(() => {
    return () => clearInterval(timerIdRef.current);
  }, []);

  useEffect(() => {
    if (flagStartTest) {
      if (timerIdRef.current) return;
      setTimer(timeOfTimer);
      startTimer();
    }
  }, [flagStartTest]);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = 0;
      finishTest();
    }
  }, [timer]);

  const startTimer = () => {
    timerIdRef.current = setInterval(function () {
      setTimer((old) => old - 1);
    }, 1000);
  };

  return (
    <div className="box-container">
      <h2>Timer</h2>
      <div className="box">{timer}</div>
    </div>
  );
}
