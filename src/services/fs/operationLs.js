import { readdir } from "node:fs/promises";

import currentPath from "../../utils/current-path.js";

export const operationLs = async () => {
  try {
    const path = currentPath.getPath();
    const dirFiles = await readdir(path, {
      withFileTypes: true,
      encoding: "utf-8",
    });

    const filesObjArray = dirFiles
      .map((file) => {
        return {
          name: file.name,
          type: file.isDirectory() ? "directory" : file.isFile() ? "file" : "",
        };
      })
      .filter((item) => item.type !== "")
      .sort((a, b) => {
        if (a.type > b.type) return 1;
        if (a.type < b.type) return -1;
        a.name > b.name ? 1 : -1;
      });

    console.table(filesObjArray);
  } catch (err) {
    operationFailed(err.message);
  }
};
