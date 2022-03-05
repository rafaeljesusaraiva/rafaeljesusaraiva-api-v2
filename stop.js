const util = require("util");
const fs = require("fs");

const exec = util.promisify(require("child_process").exec);
let jsonConfig;

// Check if JSON config file exists
try {
  jsonConfig = require("./run-config.json");
} catch (e) {
  console.error(
    "\nMissing configuration file 'run-config.json'! \nPlease use sample provided! \n"
  );
  return;
}

const runningPrefix = jsonConfig["running-prefix"];

console.log("\nRunning automation script...\n");
stop_all();
console.log("");

async function stop_all() {
  // Get data from json
  console.log(
    "Configuration File:",
    util.inspect(jsonConfig, false, null, true)
  );

  // Delete old instances already running
  await stop_old_pm2();
}

async function stop_old_pm2() {
  console.log("\nStopping and deleting old instances...");

  // Delete load balancer instances
  for await (port of jsonConfig["load-balancer"].port) {
    await delete_instance("load-balancer", port);
  }

  // Delete services instances
  for await (service of jsonConfig["services"]) {
    for await (port of service.port) {
      await delete_instance(service.name, port);
    }
  }

  console.log("");
}

async function delete_instance(service_name, port) {
  let command = `pm2 delete ${runningPrefix}-${service_name}-${port}`;
  try {
    await run_command(command, true);
    console.log(` -- Instance of '${service_name}' on port '${port}' deleted.`);
  } catch (err) {
    console.log(
      ` -- Instance of '${service_name}' on port '${port}' not running.`
    );
  }
}

async function run_command(command_string, errHandler = false) {
  const { stdout, stderr } = await exec(command_string);
  if (stderr && !errHandler) {
    console.log("stderr:", stderr);
    return;
  }
  //   console.log("stdout:", stdout);
  if (!errHandler) console.log("Command success: " + command_string);
}
