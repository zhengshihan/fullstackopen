import { useState } from "react";
import Statistics from "./components/Statistics";
import StatisticLine from "./components/StatisticLine";
import StatTable from "./components/StatTable";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const feedback = { good, neutral, bad };
  return (
    <>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <h1>statistics</h1>
      {good + neutral + bad == 0 ? (
        <h2>No feedback given</h2>
      ) : (
        <StatTable good={good} neutral={neutral} bad={bad} />
      )}
    </>
  );
};

export default App;
