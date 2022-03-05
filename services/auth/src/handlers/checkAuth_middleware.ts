import { UserService } from "../services/user_service";
import { Response, Request, NextFunction } from "express";

export class CheckAuth {
  public async check(
    req: Request,
    res: Response,
    next: NextFunction,
    permission: string
  ) {
    const token = req.headers.authorization?.split(" ")[1];
    const vToken = UserService.verifyToken(token);
    if (!vToken.success) {
      return res.send({
        success: false,
        data: { message: "Invalid Token" },
      });
    }

    const cUser = vToken.tokenBody?.sbxUser;
    cUser.username = vToken.tokenBody?.sbxUser?.username || "user_default";

    const permissions = vToken.tokenBody?.sbxPermissions;
    if (cUser) {
      // @ts-ignore: Unreachable code error
      req.cUser = cUser;
    }

    if (cUser.is_admin || permission === "*") {
      return next();
    } else if (permissions && permissions.includes(permission)) {
      return next();
    } else {
      return res.send({
        success: false,
        data: { message: "Out of user scope" },
      });
    }
  }
}

export default new CheckAuth();
