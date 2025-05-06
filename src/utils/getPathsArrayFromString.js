export const getPathsArrayFromString = (str) => {
  const arr = [];
  let currentStr = "";
  let isSingleQuotes = false;
  let isDoubleQuotes = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === "'" && !isDoubleQuotes) {
      isSingleQuotes = !isSingleQuotes;
      currentStr += char;
      continue;
    }

    if (char === '"' && !isSingleQuotes) {
      isDoubleQuotes = !isDoubleQuotes;
      currentStr += char;
      continue;
    }

    if (char === " " && !isSingleQuotes && !isDoubleQuotes) {
      if (currentStr.length > 0) {
        arr.push(currentStr);
        currentStr = "";
      }
      continue;
    }
    currentStr += char;
  }

  if (currentStr.length > 0) {
    arr.push(currentStr);
  }

  return arr;
};
