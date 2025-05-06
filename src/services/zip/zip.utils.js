import { stat } from "node:fs/promises";
import path from "node:path";

import { normalizePathString } from "../../utils/normalizePathString.js";
import { getPathsArrayFromString } from "../../utils/getPathsArrayFromString.js";
import { invalidInput, operationFailed } from "../../utils/index.js";

export const checkZipPath = async (commandKey, data) => {
  const preResultObj = {
    currentPath: null,
    futurePath: null,
    error: null,
  };

  try {
    const updateData = data.replace(commandKey, "");
    let dataArray = [];

    if (updateData.includes("'") || updateData.includes('"')) {
      dataArray = getPathsArrayFromString(updateData);
    } else {
      dataArray = updateData.trim().split(" ");
    }

    if (dataArray.length !== 2) {
      invalidInput(
        "Too many arguments(or too little), try using quotation marks."
      );
      return preResultObj;
    }

    const currentFilePath = normalizePathString(
      commandKey,
      dataArray[0].trim()
    );
    const userFilePath = normalizePathString(commandKey, dataArray[1].trim());

    const statsCurPath = await stat(currentFilePath);
    const statsUserPath = await stat(userFilePath);

    if (!statsCurPath.isFile()) {
      operationFailed("Object is not a file");
      return preResultObj;
    }
    if (!statsUserPath.isDirectory()) {
      operationFailed("Destination is not a directory");
      return preResultObj;
    }

    if (commandKey === "compress") {
      if (currentFilePath.endsWith(".br")) {
        operationFailed("File already compressed.");
        return preResultObj;
      }
    }
    if (commandKey === "decompres") {
      if (!currentFilePath.endsWith(".br")) {
        operationFailed("File was not compressed.");
        return preResultObj;
      }
    }

    const fileName = path.basename(currentFilePath);

    const futureFilePath = normalizePathString(
      commandKey,
      `${dataArray[1]}/${fileName}${
        commandKey === "compress" ? ".br" : ""
      }`.trim()
    );

    if (commandKey === "decompress") {
      return {
        currentPath: currentFilePath,
        futurePath: futureFilePath.slice(0, -3),
        error: null,
      };
    }
    if (commandKey === "compress") {
      return {
        currentPath: currentFilePath,
        futurePath: futureFilePath,
        error: null,
      };
    }
  } catch (error) {
    return {
      ...preResultObj,
      error: error.message,
    };
  }
};
