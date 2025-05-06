import path from "node:path";

import currentPath from "../../utils/current-path.js";
import { invalidInput } from "../../utils/index.js";

export const operationUp = async () => {
  const pathParsed = path.parse(currentPath.getPath());
  const rootDir = pathParsed.root;

  if (rootDir === currentPath.getPath()) {
    invalidInput("You are in the root directory.");
  } else {
    const pathNow = currentPath.getPath();
    currentPath.setPath(path.dirname(pathNow));
  }

  return;
};
