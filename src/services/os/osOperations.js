import os from "os";
import { invalidInput } from "../../utils/index.js";

export const osOperations = async (data) => {
  const params = data.trim().split("--")[1];
  switch (params) {
    case "EOL":
      console.log(JSON.stringify(os.EOL));
      console.log("-".repeat(22));
      break;
    case "cpus":
      const cpu = os.cpus();
      console.log("CPU Information:");
      console.log(`   CPUs: ${cpu.length}`);
      console.log("-".repeat(22));

      cpu.forEach((item, idx) => {
        const cpuInfo = `CPU ${
          idx + 1
        }, Model: ${item.model.trim()}, Clock Rate: ${(
          item.speed / 1000
        ).toFixed(2)} GHz`;
        console.log(cpuInfo);
        console.log("-".repeat(cpuInfo.length - 2));
      });

      break;
    case "homedir":
      console.log(`User homedir: ${os.homedir()}`);
      console.log("-".repeat(22));
      break;
    case "username":
      console.log(`User name: ${os.userInfo().username}`);
      console.log("-".repeat(22));
      break;
    case "architecture":
      console.log(`Architecture: ${os.arch()}`);
      console.log("-".repeat(22));
      break;
    default:
      invalidInput('Try again:');
      break;
  }
};
