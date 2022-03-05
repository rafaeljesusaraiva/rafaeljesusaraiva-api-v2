import { User } from "./user_model";

export interface TokenExpire {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TokenBody {
  success: boolean;
  tokenBody?: any;
  error?: Error;
}

export class Auth {
  public username: string | undefined = undefined;

  public user: User | undefined = undefined;

  public roles: Array<string> | string | undefined = undefined;

  public token: any | undefined = undefined;

  public tokenID: any | undefined = undefined;

  public tokenBody: any | undefined = undefined;

  public permissions: Array<string> | string | undefined = undefined;

  public expireSecs: any | undefined = undefined;

  public tokenIssuedAt: any | undefined = undefined;

  public tokenSecret: string | undefined = undefined;

  public tokenExpire: TokenExpire | undefined = undefined;

  public is_admin: boolean | undefined = undefined;

  constructor(tokenSecret: string, tokenExpire: TokenExpire, userOb?: any) {
    this.tokenSecret = tokenSecret;
    this.tokenExpire = tokenExpire;
    if (userOb) {
      this.user = userOb;
    }
    return this;
  }
}

export default Auth;
