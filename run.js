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
run_all();
console.log("");

async function run_all() {
  // Get data from json
  console.log(
    "Configuration File:",
    util.inspect(jsonConfig, false, null, true)
  );

  // Delete old instances already running
  await stop_old_pm2();

  // Run load-balancer after deleting ./load-balancer/dist and building
  if (check_folder("./load-balancer/dist")) {
    delete_folder("./load-balancer/dist");
  }

  console.log(`Building 'load-balancer'...`);
  await run_command("npm --prefix ./load-balancer/ run build");

  console.log("\nStarting load-balancer instances:\n");
  for await (port of jsonConfig["load-balancer"].port) {
    await start_instance(
      "./load-balancer",
      "load-balancer",
      jsonConfig["load-balancer"].ip,
      port
    );
  }
  console.log("");

  // Build and run services
  for await (service of jsonConfig.services) {
    // Check if service is already built and delete 'dist' folder
    console.log(`Deleting 'dist' folder of service '${service.name}'...\n`);
    if (check_folder(`./services/${service.name}/dist`)) {
      delete_folder(`./services/${service.name}/dist`);
    }

    // Build Service
    console.log(`Building service '${service.name}'...`);
    await run_command(`npm --prefix ./services/${service.name}/ run build`);

    // Run Service
    console.log(`\nStarting service '${service.name}' instances:\n`);
    for await (port of service.port) {
      await start_instance(
        `./services/${service.name}`,
        service.name,
        service.ip,
        port
      );
    }
  }
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

async function start_instance(service_path, service_name, ip, port) {
  let command;
  if (service_name == "load-balancer") {
    command = `pm2 start "node ${service_path}/dist/app.js --es-module-specifier-resolution=node" --name ${runningPrefix}-${service_name}-${port} --time --watch --ignore-watch="node_modules" -- ip=${ip} port=${port}`;
  } else {
    command = `pm2 start "node ${service_path}/dist/services/${service_name}/src/app.js --ip=${ip} --port=${port} --es-module-specifier-resolution=node" --name ${runningPrefix}-${service_name}-${port} --time --watch --ignore-watch="node_modules"`;
  }

  try {
    await run_command(command, true);
    console.log(
      ` -- Instance of '${service_name}' on port '${port} started successfully.`
    );
  } catch (err) {
    console.log(
      ` -- Instance of '${service_name}' on port '${port} failed to start.`,
      err
    );
  }
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

function check_folder(directory) {
  if (fs.existsSync(directory)) {
    return true;
  } else {
    return false;
  }
}

function delete_folder(directory) {
  fs.rmSync(directory, { recursive: true, force: true });
}
