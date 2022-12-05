export function getFromLocal(key: string) {
  if (typeof localStorage !== undefined) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
}

export function setToLocalStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromLocal(key: string) {
  localStorage.removeItem(key);
}
