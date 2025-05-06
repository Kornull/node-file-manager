import process from "node:process";

import {
  copyFile,
  createDirectory,
  createEmptyFile,
  deleteFile,
  moveFile,
  operationCd,
  operationLs,
  operationUp,
  readFile,
  renameFile,
} from "./fs/index.js";
import { osOperations } from "./os/osOperations.js";
import { getHash } from "./hash/getHash.js";
import { compressFile, decompressFile } from "./zip/index.js";

import { invalidInput } from "../utils/index.js";

export const checkUserCommandLine = async (data) => {
  const commandKey = data.split(" ")[0].trim();
  switch (commandKey) {
    case ".exit":
      process.exit();
      break;
    case "add":
      await createEmptyFile(commandKey, data);
      break;
    case "cat":
      await readFile(commandKey, data);
      break;
    case "cd":
      await operationCd(commandKey, data);
      break;
    case "compress":
      await compressFile(commandKey, data);
      break;
    case "cp":
      await copyFile(commandKey, data);
      break;
    case "decompress":
      await decompressFile(commandKey, data);
      break;
    case "hash":
      await getHash(commandKey, data);
      break;
    case "mkdir":
      await createDirectory(commandKey, data);
      break;
    case "mv":
      await moveFile(commandKey, data);
      break;
    case "ls":
      await operationLs();
      break;
    case "os":
      await osOperations(data);
      break;
    case "rn":
      await renameFile(commandKey, data);
      break;
    case "rm":
      await deleteFile(commandKey, data);
      break;
    case "up":
      await operationUp();
      break;
    default:
      invalidInput("Try again:");
      break;
  }
};
