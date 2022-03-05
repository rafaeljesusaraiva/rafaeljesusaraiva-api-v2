import express from "express";
import Schema from "../handlers/schema_middleware";
import AuthValidator from "../helpers/auth_validator";
import { AuthController } from "../controllers/auth";
import { wrapper } from "../helpers/exception_wrapper";
import CheckAuth from "../handlers/checkAuth_middleware";

const router = express.Router();

router.post(
  "/login",
  (req, res, next) => {
    Schema.handle(req, res, next, AuthValidator.login());
  },
  wrapper(AuthController.login)
);

router.post(
  "/forgot-password",
  (req, res, next) => {
    Schema.handle(req, res, next, AuthValidator.forgotPassword());
  },
  wrapper(AuthController.forgotPassword)
);

router.post(
  "/change-password",
  (req, res, next) => {
    Schema.handle(req, res, next, AuthValidator.changePassword());
  },
  (req, res, next) => {
    CheckAuth.check(req, res, next, "");
  },
  wrapper(AuthController.changePassword)
);

router.get(
  "/whoami",
  (req, res, next) => {
    Schema.handle(req, res, next, AuthValidator.whoami());
  },
  (req, res, next) => {
    CheckAuth.check(req, res, next, "*");
  },
  wrapper(AuthController.whoami)
);

router.get(
  "/refresh-token",
  (req, res, next) => {
    Schema.handle(req, res, next, AuthValidator.whoami());
  },
  (req, res, next) => {
    CheckAuth.check(req, res, next, "*");
  },
  wrapper(AuthController.refreshToken)
);

export default router;
