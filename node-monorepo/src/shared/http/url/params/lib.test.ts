import { clone } from "./lib";

describe("test clone", () => {
  const cases = [
    {
      input: new URLSearchParams("a=b"),
    },
    {
      input: new URLSearchParams(""),
    },
    {
      input: new URLSearchParams("a=b&b=c"),
    },
  ];

  test.each(cases)("clone($input) -> $output", ({ input }) => {
    input.sort();

    const response = clone(input);
    response.sort();

    expect(input.toString()).toStrictEqual(response.toString());
  });
});
