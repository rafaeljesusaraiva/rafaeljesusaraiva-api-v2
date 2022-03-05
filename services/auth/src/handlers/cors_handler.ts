import { NextFunction, Response, Request } from "express";

export const CORS = {
  handle: function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Authorization, If-Modified-Since, Cache-control, Pragma, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers"
    );

    res.header("Access-Control-Expose-Headers", "File-Name, File-Type");

    return next();
  },
};
