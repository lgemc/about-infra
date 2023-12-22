import crypto from "crypto";

const defaultBytesLength = 50;

export const generateID = (input: {
  length: number;
  prefix?: string;
}): string => {
  const id = crypto
    .randomBytes(defaultBytesLength)
    .toString("hex")
    .substring(0, input.length);
  if (!input.prefix) {
    return id;
  }

  return `${input.prefix}${id}`;
};
