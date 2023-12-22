import { Result, ok, err } from "neverthrow";

export enum ErrorTypes {
  ParseError = "ParseError",
}

export class NumberError extends Error {
  constructor(message: string, name: string) {
    super(message);

    this.name = name;
  }
}

export function isNumber(input: any): boolean {
  return !isNaN(Number(input));
}

export function parse(input: any): Result<number, Error> {
  const val = Number(input);
  if (val !== val) {
    return err(
      new NumberError("can not parse the given value", ErrorTypes.ParseError)
    );
  }

  return ok(val);
}

const numbersLib = {
  parse,
  isNumber,
};

export default numbersLib;
