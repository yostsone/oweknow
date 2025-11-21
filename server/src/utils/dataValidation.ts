export const isValidIdString = (id: string): boolean => {
  const trimmedId = id.trim();
  return /^[+-]?\d+$/.test(trimmedId);
}

export const isValidId = (id: number): boolean => {
  return Number.isInteger(id) && id > 0 && Number.isSafeInteger(id);
}

export const prepareParsedId = (id: string): number | null => {
  if (!isValidIdString(id)) {
    return null;
  }

  const parsedId = parseInt(id, 10);

  return isValidId(parsedId) ? parsedId : null
}