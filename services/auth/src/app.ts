import express from "express";
import * as config from "../../../config";
import routes from "./routes";
import { CORS, notFoundHandler } from "./handlers";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const app_args = require("minimist")(process.argv.slice(2));
const service_port = app_args["port"];
const service_ip = app_args["ip"];

if (service_port === undefined || service_ip === undefined) {
  process.nextTick(function () {
    throw new Error("Missing variable 'port' on process start.");
  });
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1.5MB" }));
app.use(CORS.handle);

app.set("tokenSecret", config.server.apiUuid); // secret variable used for Jwt encoding
app.set("tokenExpire", config.server.tokenExpiration);

// Add a health check route in express
app.get("/_health", (req, res) => {
  res.status(200).json({
    service: "Authentication micro-service",
    health: true,
    timestamp: Date.now(),
  });
});

app.use("/", routes);
app.use("*", notFoundHandler);

app.listen(service_port, () => {
  console.log(
    `Authentication API is running on ${service_ip}:${service_port}.`
  );
});
