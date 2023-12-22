function last<T = any>(array: T[]): T | undefined {
  if (array.length === 0) {
    return;
  }

  return array[array.length - 1];
}

function $in(array: Array<string | number>, element: any): boolean {
  if (!array) {
    return false;
  }

  if (array.length === 0) {
    return false;
  }

  return array.indexOf(element) !== -1;
}

const arrayLib = {
  last,
  in: $in,
};

export default arrayLib;
