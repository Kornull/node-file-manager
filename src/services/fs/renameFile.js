import fs from "node:fs/promises";

import { normalizePathString } from "../../utils/normalizePathString.js";
import { getPathsArrayFromString } from "../../utils/getPathsArrayFromString.js";
import { invalidInput, operationFailed } from "../../utils/index.js";

export const renameFile = async (commandKey, data) => {
  const updateData = data.replace(commandKey, "");
  let dataArray = [];

  if (updateData.includes("'") || updateData.includes('"')) {
    dataArray = getPathsArrayFromString(updateData);
  } else {
    dataArray = updateData.trim().split(" ");
  }

  if (dataArray.length !== 2) {
    invalidInput("Too many arguments(or too little), try using quotation marks.");
    return;
  }

  const currentFilePath = normalizePathString(commandKey, dataArray[0]);
  const futureFilePath = normalizePathString(commandKey, dataArray[1]);

  try {
    const stats = await fs.stat(currentFilePath);
    if (stats.isFile()) {
      await fs
        .stat(futureFilePath)
        .then(() => {
          throw new Error();
        })
        .catch(async () => {
          await fs.rename(currentFilePath, futureFilePath).catch(() => {
            throw new Error();
          });
        });
    } else {
      invalidInput();
      return;
    }
  } catch (err) {
    operationFailed(err.message);
    return;
  }
};
