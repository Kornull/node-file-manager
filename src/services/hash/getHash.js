import crypto from "node:crypto";
import fs from "node:fs";

import { normalizePathString } from "../../utils/normalizePathString.js";
import { invalidInput, operationFailed } from "../../utils/index.js";

export const getHash = async (commandKey, data) => {
  try {
    const normalizePath = normalizePathString(commandKey, data);

    const hash = crypto.createHash("sha256");

    const rs = fs.createReadStream(normalizePath, { encoding: "utf-8" });

    rs.on("data", (data) => {
      hash.update(data);
    });

    rs.on("end", () => {
      console.log(`${hash.digest("hex")}`);
    });

    rs.on("error", (err) => {
      invalidInput(err.message);
    });
  } catch (err) {
    operationFailed(err.message);
    return;
  }
};
