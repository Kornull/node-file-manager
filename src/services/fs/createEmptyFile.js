import fs from "node:fs";
import path from "node:path";
import currentPath from "../../utils/current-path.js";

import { normalizePathString } from "../../utils/normalizePathString.js";
import { invalidInput, operationFailed } from "../../utils/index.js";

export const createEmptyFile = async (commandKey, data) => {
  const normalizePath = normalizePathString(commandKey, data);
  const pathNow = path.normalize(
    `${currentPath.getPath()}/${path.basename(normalizePath)}`
  );

  if (pathNow === normalizePath) {
    fs.open(normalizePath, "ax", (err, _) => {
      if (err) {
        operationFailed("File already exists");
        return;
      }
    });
  } else {
    invalidInput("Incorrect file path");
    return;
  }
};
