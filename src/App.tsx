import { Timer, InputWrapper, Score, Button } from "./components";

function App() {
  return (
    <main className="main">
      <div className="functionality-container">
        <Timer />
        <Score />
      </div>
      <InputWrapper />
      <Button />
    </main>
  );
}

export default App;
