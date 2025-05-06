import fs from "node:fs/promises";
import path from "node:path";

import { normalizePathString } from "../../utils/normalizePathString.js";
import currentPath from "../../utils/current-path.js";
import { invalidInput, operationFailed } from "../../utils/index.js";

export const createDirectory = async (commandKey, data) => {
  const normalizePath = normalizePathString(commandKey, data);
  const pathNow = path.normalize(
    `${currentPath.getPath()}/${path.basename(normalizePath)}`
  );

  try {
    if (pathNow === normalizePath) {
      await fs.mkdir(normalizePath, { recursive: false });
    } else {
      invalidInput("Incorrect file path");
      return;
    }
  } catch (err) {
    operationFailed(err.message);
    return;
  }
};
