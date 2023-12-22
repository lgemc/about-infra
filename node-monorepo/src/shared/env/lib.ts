import { ok, Result } from "neverthrow";
import { parse } from "../numbers";

function string(name: string, _default: string = "localhost"): string {
  const val = process.env[name];
  if (val) {
    return val;
  }

  return _default;
}

function number(name: string, _default: number): Result<number, Error> {
  const val = process.env[name];
  if (!val) {
    return ok(_default);
  }

  return parse(val);
}

const env = {
  string,
  number,
};

export default env;
