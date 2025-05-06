import { access, stat } from "node:fs/promises";

import currentPath from "../../utils/current-path.js";
import { normalizePathString } from "../../utils/normalizePathString.js";
import { invalidInput } from "../../utils/index.js";

export const operationCd = async (commandKey, data) => {
  const normalizePath = normalizePathString(commandKey, data);

  try {
    await access(normalizePath);
    const stats = await stat(normalizePath);
    if (stats.isDirectory()) currentPath.setPath(normalizePath);
    else {
      throw new Error();
    }
  } catch (err) {
    invalidInput(err.message);
    return;
  }
};
