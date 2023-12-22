import { err } from "neverthrow";
import { isNumber, parse } from ".";

describe("is number", () => {
  const cases = [
    {
      input: "a",
      is: false,
    },
    {
      input: 1,
      is: true,
    },
    {
      input: ".",
      is: false,
    },
    {
      input: { a: 1 },
      is: false,
    },
    {
      input: "123",
      is: true,
    },
  ];

  test.each(cases)(".isNumber($input, $is)", ({ input, is }) => {
    expect(isNumber(input)).toBe(is);
  });
});

describe("parse", () => {
  const cases = [
    {
      input: ".",
      isError: true,
    },
    {
      input: "1",
      output: 1,
    },
    {
      input: 10,
      output: 10,
    },
  ];
  test.each(cases)(
    ".parse($input, $output, $isError)",
    ({ input, isError, output }) => {
      const response = parse(input);
      if (isError) {
        expect(response.isErr()).toBeTruthy();

        return;
      }

      expect(response._unsafeUnwrap()).toBe(output);
    }
  );
});
