import path from "node:path";

import currentPath from "./current-path.js";

export const normalizePathString = (commandKey, data) => {
  const curPath = currentPath.getPath();

  let userPath = data;

  if (commandKey !== "rn" && commandKey !== "cp" && commandKey !== "decompress" && commandKey !== "compress") userPath = data.replace(commandKey, "").trim();

  if (userPath.includes("'") || userPath.includes('"')) {
    userPath = cleanString(userPath);
  }

  const findWinSep = userPath.indexOf(":");

  if (findWinSep === 1) {
    if (userPath.length === 2) userPath = `${userPath}/`;
    const uPath = userPath[0].toUpperCase() + userPath.slice(1);

    return path.normalize(path.join(uPath));
  } else {
    return path.normalize(path.join(curPath, userPath));
  }
};

const cleanString = (string) => {
  return string
    .split("")
    .filter((item) => item !== "'" && item !== '"')
    .join("");
};
