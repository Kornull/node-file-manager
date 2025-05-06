import process from "node:process";

export const closeFIleManager = (user) => {
  process.stdout.write(
    `\nThank you for using File Manager, ${user}, goodbye!\n`
  );
  process.exit();
};
