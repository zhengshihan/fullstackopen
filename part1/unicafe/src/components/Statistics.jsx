import React from "react";
import StatisticLine from "./StatisticLine";
const Statistics = ({ good, bad, neutral }) => {
  const average = (good - bad) / (good + bad + neutral);
  const positive = good / (good + bad + neutral);
  const all = good + bad + neutral;
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  );
};

export default Statistics;
