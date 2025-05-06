export const operationFailed = (err = "") => {
  console.log(`\x1b[31mOperation failed! ${err}\x1b[0m`);
};
