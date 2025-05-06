import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";

import { normalizePathString } from "../../utils/normalizePathString.js";
import { invalidInput, operationFailed } from "../../utils/index.js";

export const readFile = async (commandKey, data) => {
  const normalizePath = normalizePathString(commandKey, data);

  try {
    await access(normalizePath);
    const stats = await stat(normalizePath);
    if (stats.isFile()) {
      const rs = createReadStream(normalizePath, { encoding: "utf-8" });

      rs.on("data", (data) => {
        process.stdout.write(data);
      });
      rs.on("error", (err) => {
        invalidInput(err.message);
        return;
      });
      rs.on("end", () => {
        process.stdout.write("\n");
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    operationFailed(err.message);
    return;
  }
};
