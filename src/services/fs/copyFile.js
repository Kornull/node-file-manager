import fs from "node:fs";
import { access, stat } from "node:fs/promises";
import path from "node:path";

import { normalizePathString } from "../../utils/normalizePathString.js";
import { getPathsArrayFromString } from "../../utils/getPathsArrayFromString.js";
import { invalidInput, operationFailed } from "../../utils/index.js";

export const copyFile = async (commandKey, data) => {
  try {
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

    const stats = await stat(currentFilePath);
    if (stats.isFile()) {
      const fileName = path.basename(currentFilePath);

      const futureFilePath = normalizePathString(
        commandKey,
        `${dataArray[1]}/(copy)${fileName}`
      );
      try {
        await access(futureFilePath);
        operationFailed("File already exists");
        return;
      } catch (err) {}

      const rs = fs.createReadStream(currentFilePath, { encoding: "utf-8" });
      const ws = fs.createWriteStream(futureFilePath, { encoding: "utf-8" });

      rs.on("error", (err) => {
        ws.end();
        operationFailed(err.message);
        return;
      });

      ws.on("error", (err) => {
        rs.destroy();
        operationFailed(err.message);
        return;
      });
      rs.pipe(ws);
    }
  } catch (err) {
    operationFailed(err.message);
    return;
  }
};
