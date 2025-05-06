import fs from "node:fs";
import { stat } from "node:fs/promises";

import { normalizePathString } from "../../utils/normalizePathString.js";
import { invalidInput, operationFailed } from "../../utils/index.js";

export const deleteFile = async (commandKey, data) => {
  try {
    const currentFilePath = normalizePathString(commandKey, data);

    const stats = await stat(currentFilePath);
    if (stats.isFile()) {
      fs.unlink(currentFilePath, (err) => {
        if (err) {
          operationFailed(err.message);
          return;
        }
      });
    } else {
      invalidInput("Try again");
      return;
    }
  } catch (err) {
    operationFailed(err.message);
    return;
  }
};
