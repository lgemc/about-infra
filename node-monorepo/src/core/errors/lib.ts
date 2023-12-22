export function buildObject(error: Error): object {
  const newValue = Object.getOwnPropertyNames(error).reduce(
    (obj, propName) => {
      obj[propName] = error[propName];
      return obj;
    },
    { name: error.name }
  );
  return newValue;
}
