import Common from "./common_model";
import Helper from "../helpers/db_helper";

export class User extends Common {
  public username: string | undefined = undefined;

  public firstName: string | undefined = undefined;

  public lastName: string | undefined = undefined;

  public email: string | undefined = undefined;

  public profileImage: string | undefined = undefined;

  public salt: string | undefined = undefined;

  public hashedPassword: string | undefined = undefined;

  public id_role: number | undefined = undefined;

  public role_name: string | undefined = undefined;

  public is_admin: boolean | undefined = undefined;

  constructor(model?: any) {
    super();
    if (model) {
      Helper.shallowCopy(model, this);
    }
  }
}

export default User;
