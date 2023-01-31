import { Timer, InputWrapper, Score } from "./components";

function App() {
  return (
    <main className="main">
      <div className="functionality-container">
        <Timer />
        <Score />
      </div>
      <InputWrapper />
    </main>
  );
}

export default App;
