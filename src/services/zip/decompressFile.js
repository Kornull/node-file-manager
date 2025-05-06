import fs from "node:fs";
import { access } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { createBrotliDecompress } from "node:zlib";

import { operationFailed } from "../../utils/index.js";
import { checkZipPath } from "./zip.utils.js";

export const decompressFile = async (commandKey, data) => {
  try {
    const { currentPath, futurePath, error } = await checkZipPath(
      commandKey,
      data
    );

    if (error) {
      throw new Error(error);
    }
    if (!currentPath || !futurePath) return;

    try {
      await access(futurePath);
      operationFailed("File already exists");
      return;
    } catch (error) {}

    try {
      const rs = fs.createReadStream(currentPath);
      const ws = fs.createWriteStream(futurePath);
      await pipeline(rs, createBrotliDecompress(), ws);
    } catch (error) {
      operationFailed(error.message);
      return;
    }
  } catch (error) {
    operationFailed(error.message);
    return;
  }
};
