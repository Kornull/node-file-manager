import pc from "node:process";

export const getUserName = () => {
  let userName = "Mystery visitor";
  const userData = pc.argv.filter((el) => el.includes("--username="));
  if (userData.length) {
    const index = userData[0].indexOf("=");
    userName = userData[0].slice(index + 1).trim() || userName;
  }

  return userName;
};
