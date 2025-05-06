import readline from "node:readline/promises";
import process from "node:process";

import { closeFIleManager } from "./services/index.js";
import { checkUserCommandLine } from "./services/checkUserCommandLine.js";

import { getUserName } from "./utils/index.js";
import currentPath from "./utils/current-path.js";

const appRun = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "\x1b[32m> \x1b[0m",
  });

  const user = getUserName();

  console.log(
    `\x1b[36mWelcome to the File Manager, ${user}!\nYou are currently in ${currentPath.getPath()}\x1b[0m`
  );
  rl.prompt();

  rl.on("line", async (input) => {
    await checkUserCommandLine(input);
    setTimeout(() => {
      console.log(
        `\n\x1b[35mYou are currently in ${currentPath.getPath()}\x1b[0m`
      );
      rl.prompt();
    }, 10);
  });

  process.on("exit", () => closeFIleManager(user));
};

appRun();
