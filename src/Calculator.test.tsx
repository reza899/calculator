import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Calculator from "./Calculator";
import userEvent from "@testing-library/user-event";

describe("<Calculator />", () => {
  it("shows numbers", () => {
    render(<Calculator />);
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    numbers.forEach((n) => {
      expect(screen.getByText(n.toString())).toBeInTheDocument();
    });
  });

  it("shows 4 rows", () => {
    render(<Calculator />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);
  });

  it("shows calculation operators", () => {
    render(<Calculator />);
    const operations = ["*", "/", "-", "="];

    operations.forEach((n) =>
      expect(screen.getByText(n.toString())).toBeInTheDocument()
    );
  });

  it("renders equal and clear sign", () => {
    render(<Calculator />);
    const equalEl = "=";
    const clearEl = "C";
    expect(screen.getByText(equalEl)).toBeInTheDocument();
    expect(screen.getByText(clearEl)).toBeInTheDocument();
  });

  it("renders an input", () => {
    render(<Calculator />);
    const inputEl = screen.getByTestId("input-value");
    expect(inputEl).toBeDisabled();
  });

  it("display users inputs", async () => {
    render(<Calculator />);

    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const plusOperator = screen.getByText("+");

    userEvent.click(one);
    userEvent.click(plusOperator);
    userEvent.click(two);

    const result = (await screen.findByTestId(
      "input-value"
    )) as HTMLInputElement;
    expect(result.value).toBe("1+2");
  });

  it("calculate based on users inputs", async () => {
    render(<Calculator />);
    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const plusOperator = screen.getByText("+");
    const equal = screen.getByText("=");

    userEvent.click(one);
    userEvent.click(plusOperator);
    userEvent.click(two);
    userEvent.click(equal);

    const result = (await screen.findByTestId(
      "input-value"
    )) as HTMLInputElement;

    expect(result.value).toBe("3");
  });

  it("can clear results", async () => {
    render(<Calculator />);

    const one = screen.getByText("1");
    const two = screen.getByText("2");
    const plusOperator = screen.getByText("+");
    const clear = screen.getByText("C");

    userEvent.click(one);
    userEvent.click(plusOperator);
    userEvent.click(two);
    userEvent.click(clear);

    const result = (await screen.findByTestId(
      "input-value"
    )) as HTMLInputElement;

    expect(result.value).toBe("");
  });

  it("handles divided by zero", async () => {
    render(<Calculator />);

    const one = screen.getByText("1");
    const zero = screen.getByText("0");
    const divideOperation = screen.getByText("/");
    const equal = screen.getByText("=");

    userEvent.click(one);
    userEvent.click(divideOperation);
    userEvent.click(zero);
    userEvent.click(equal);

    const result = (await screen.findByTestId(
      "input-value"
    )) as HTMLInputElement;

    expect(result.value).toBe("NaN");
  });
});
