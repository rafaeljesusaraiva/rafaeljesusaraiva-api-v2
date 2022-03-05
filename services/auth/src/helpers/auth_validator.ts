import Joi from "joi";

class AuthValidator {
  public login() {
    return Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
  }

  public addAdmin() {
    return Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
  }

  public forgotPassword() {
    return Joi.object({
      username: Joi.string().required(),
    });
  }

  public changePassword() {
    return Joi.object({
      username: Joi.string().required(),
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    });
  }

  public whoami() {
    return Joi.object({});
  }
}

export default new AuthValidator();
