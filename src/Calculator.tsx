import React, { useState } from "react";

const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];
const operations = ["*", "/", "-", "+"];

const Calculator = () => {
  const [value, setValue] = useState("");

  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <input type="text" data-testid="input-value" value={value} disabled />
      <br />
      {operations.map((op, i) => (
        <button key={i} onClick={() => setValue((prev) => prev + op)}>
          {op}
        </button>
      ))}
      <div role="grid">
        {rows.map((row, i) => (
          <div role="row" key={i}>
            {i === 3 && <button onClick={() => setValue("")}>C</button>}
            {row.map((n) => (
              <button key={n} onClick={() => setValue((prev) => prev + n)}>
                {n}
              </button>
            ))}
            {i === 3 && <button>=</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
