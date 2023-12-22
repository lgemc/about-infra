export function clone(params: URLSearchParams): URLSearchParams {
  const result = new URLSearchParams();

  for (const key of params.keys()) {
    result.append(key, params.get(key));
  }

  return result;
}
