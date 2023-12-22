import { buildObject } from "./lib";

describe("build object", () => {
  test("message error", () => {
    const message = "some";
    const err = new Error(message);
    const response = buildObject(err);
    expect(response).toStrictEqual({
      message,
      stack: err.stack,
      name: "Error",
    });
  });
});
