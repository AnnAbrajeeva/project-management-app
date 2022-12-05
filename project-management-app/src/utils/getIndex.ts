export function getIndex(index: number) {
  if (index <= 9) {
    return `0${index + 1}`;
  }
  return index + 1;
}
