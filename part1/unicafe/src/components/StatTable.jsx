import React from "react";
import StatisticLine from "./StatisticLine";
const StatTable = ({ good, bad, neutral }) => {
  const average = (good - bad) / (good + bad + neutral);
  const positive = good / (good + bad + neutral);
  const all = good + bad + neutral;
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive * 100} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatTable;
