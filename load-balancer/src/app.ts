import httpProxy from "express-http-proxy";
import express, { Request, Response } from "express";

const app = express();
const app_args = require("minimist")(process.argv.slice(2));
const service_port = app_args["port"];
const service_ip = app_args["ip"];

var logger = require("morgan");
app.use(logger("dev"));

function selectProxyHost(req: Request): string {
  if (req.path.startsWith("/movies")) return "http://localhost:3000/";
  else if (req.path.startsWith("/cinemas")) return "http://localhost:3001/";
  else return "http://rafaeljesusaraiva.pt";
}

app.use((req: Request, res: Response, next) => {
  httpProxy(selectProxyHost(req))(req, res, next);
});

app.listen(service_port, () => {
  console.log(
    `Authentication API is running on ${service_ip}:${service_port}.`
  );
});
