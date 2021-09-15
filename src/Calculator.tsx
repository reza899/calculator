import React from "react";

const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];
const operations = ["*", "/", "-", "="];

const Calculator = () => {
  return (
    <div className="calculator">
      <h1>Calculator</h1>
      {operations.map((op, i) => (
        <button key={i}>{op}</button>
      ))}
      <div role="grid">
        {rows.map((row) => (
          <div role="row">
            {row.map((n) => (
              <button key={n}>{n}</button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
