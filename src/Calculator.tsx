import { evaluate } from "mathjs";
import React, { useState } from "react";
import classes from "./Calculator.module.css";

const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];
const operations = ["*", "/", "-", "+"];

const Calculator = () => {
  const [value, setValue] = useState("");

  const equalHandler = () => {
    if (!value && !value.length) return;
    let result;

    try {
      result = evaluate(value);
    } catch (e) {
      console.log((e as Error).message);
      setValue("NaN");
      return;
    }

    result !== Infinity ? setValue(result) : setValue("NaN");
  };

  return (
    <div className={classes.Calculator}>
      <h1>Calculator</h1>
      <input type="text" data-testid="input-value" value={value} disabled />
      <br />
      <div className={classes.container}>
        {operations.map((operation, i) => (
          <button
            className={classes.keyOperation}
            key={i}
            onClick={() => setValue((prev) => prev + operation)}
          >
            {operation}
          </button>
        ))}
      </div>
      <div role="grid" className={classes.keyContainer}>
        {rows.map((row, i) => (
          <div role="row" key={i}>
            {i === 3 && (
              <button className={classes.keyItem} onClick={() => setValue("")}>
                C
              </button>
            )}
            {row.map((n) => (
              <button
                className={classes.keyItem}
                key={n}
                onClick={() => setValue((prev) => prev + n)}
              >
                {n}
              </button>
            ))}
            {i === 3 && (
              <button className={classes.keyItem} onClick={equalHandler}>
                =
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
