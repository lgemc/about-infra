import { err, ok, Result } from "neverthrow";

function parse(raw: string): Result<URL, Error> {
  try {
    return ok(new URL(raw));
  } catch (e) {
    return err(e);
  }
}

const url = {
  parse,
};

export default url;
