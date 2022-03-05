import * as config from "../../../../config";
import PGPool from "./db_pool";
import { Request } from "express";
import { User } from "../models";
// import UserService from "../services/user_service";

export interface CUserAuthInfoRequest extends Request {
  cUser: User;
}

export class Helper {
  public static getUser(user: User) {
    let _user!: User;
    Helper.shallowCopy(user, _user);
    return _user;
  }

  public static pool() {
    return new PGPool(config.dbObj);
  }

  // public static getUserService() {
  //   const _userService = new UserService(this.defaultUser());
  //   return _userService;
  // }

  public static defaultUser() {
    let _user!: User;
    _user.username = "user_default";
    return _user;
  }

  public static async beginTransaction(pool: PGPool, cUser: any) {
    const sql = "BEGIN";
    try {
      return await pool.aquery(cUser, sql, []);
    } catch (error) {
      throw error;
    }
  }

  public static async commitTransaction(pool: PGPool, cUser: any) {
    const sql = "COMMIT";
    try {
      return await pool.aquery(cUser, sql, []);
    } catch (error) {
      throw error;
    }
  }

  public static async rollbackTransaction(pool: PGPool, cUser: any) {
    const sql = "ROLLBACK";
    try {
      return await pool.aquery(cUser, sql, []);
    } catch (error) {
      throw error;
    }
  }

  public static shallowCopy(source: any, target: any) {
    Object.keys(target).forEach((key) => {
      if (source[key] !== undefined) {
        target[key] = source[key];
      }
    });

    return target;
  }
}

export default Helper;
