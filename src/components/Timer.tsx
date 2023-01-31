import { useEffect, useRef, useState } from "react";
import useWordStore from "../stores/word_store";

export function Timer() {
  const flagStartTest = useWordStore((state) => state.flagStartTest);

  const finishTest = useWordStore((state) => state.finishTest);

  let timerIdRef = useRef(0);

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    return () => clearInterval(timerIdRef.current);
  }, []);

  useEffect(() => {
    if (flagStartTest) {
      if (timerIdRef.current) return;
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
    <section className="box">
      <p>{timer}</p>
    </section>
  );
}
