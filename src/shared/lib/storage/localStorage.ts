export const readFromStorage = <T>(key: string, fallbackValue: T): T => {
  try {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) {
      return fallbackValue;
    }

    return JSON.parse(rawValue) as T;
  } catch {
    return fallbackValue;
  }
};

export const writeToStorage = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Intentionally ignored: app should continue even if storage is unavailable.
  }
};
