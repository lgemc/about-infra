import lib, { Hour, Minute } from "./time";
describe("parse duration", () => {
  test("sub", () => {
    const cases = [
      {
        date: lib.now(),
        sub: 1 * Hour,
      },
      {
        date: lib.now(),
        sub: 24 * 7 * Hour,
      },
    ];

    for (const c of cases) {
      expect(lib.sub(c.date, c.sub)).not.toBeNaN();
    }
  });
  test("invalid", () => {
    const cases = ["2mmmm", ",", "m"];
    for (const c of cases) {
      const result = lib.parseDuration(c);
      expect(result.isErr()).toBeTruthy();
    }
  });

  test("valid", () => {
    const cases = [
      {
        input: "2m",
        output: 2 * Minute,
      },
      {
        input: "2h",
        output: 2 * Hour,
      },
      {
        input: "12334",
        output: 12334,
      },
    ];

    for (const c of cases) {
      const result = lib.parseDuration(c.input);
      expect(result.isErr()).toBeFalsy();
      expect(result._unsafeUnwrap()).toBe(c.output);
    }
  });
});
