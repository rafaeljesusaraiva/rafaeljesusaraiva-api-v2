import events from "../events";
import { UserService } from "../services/user_service";
import { CUserAuthInfoRequest } from "../helpers/db_helper";
import { Response, Request, NextFunction } from "express";
import { ResponseWrapper } from "../helpers/response_wrapper";

export class AuthController {
  public static async login(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const { username, password } = req.body;

    const result = await UserService.login(username, password);
    const response: ResponseWrapper = new ResponseWrapper(res);

    if (result.success) {
      events.emit("user_logins", result.data.user, req.ip, req.headers.host);
    }
    return response.created(result);
  }

  public static async forgotPassword(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const { username } = req.body;
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.created(await UserService.forgotPassword(username));
  }

  public static async changePassword(
    req: CUserAuthInfoRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    if (!req.cUser) {
      return res.json({
        success: false,
        data: { message: "No user found" },
        status: 404,
      });
    }

    const objSysAdmin = req.cUser;
    const { username, oldPassword, newPassword }: any = req.body;

    const userService: UserService = new UserService(objSysAdmin);
    const response: ResponseWrapper = new ResponseWrapper(res);

    return response.created(
      await userService.changePassword(username, oldPassword, newPassword)
    );
  }

  public static async whoami(
    req: CUserAuthInfoRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    if (!req.cUser) {
      return res.json({
        success: false,
        data: { message: "No user found" },
        status: 404,
      });
    }
    const response: ResponseWrapper = new ResponseWrapper(res);
    const objSysAdmin = req.cUser;
    return response.ok(await UserService.whoami(objSysAdmin.username || ""));
  }

  public static async refreshToken(
    req: CUserAuthInfoRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    if (!req.cUser) {
      return res.json({
        success: false,
        data: { message: "No user found" },
        status: 404,
      });
    }
    const response: ResponseWrapper = new ResponseWrapper(res);
    const objSysAdmin = req.cUser;
    return response.ok(
      await UserService.refreshToken(objSysAdmin.username || "")
    );
  }
}
