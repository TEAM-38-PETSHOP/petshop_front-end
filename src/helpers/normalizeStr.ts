export const normalizeStr = (str: string) => {
  const lowerCaseStr = str.toLocaleLowerCase();

  return lowerCaseStr[0].toUpperCase() + lowerCaseStr.slice(1);
};
