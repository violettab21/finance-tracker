export const saveItem = (key: string, object: unknown) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const getItem = (key: string) => {
  const savedItem = localStorage.getItem(key);
  if (savedItem) {
    try {
      const result: unknown = JSON.parse(savedItem);
      return result;
    } catch {
      throw new Error('Unable to parse saved object');
    }
  } else return null;
};
