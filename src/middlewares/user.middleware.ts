import { Request, Response, NextFunction } from "express";

import sanitizer from "../lib/sanitizer";
import userSchema from "../schemas/user.schema";

class UserMiddleware {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      sanitizer(req.body);
      req.body = await userSchema.createUser.validateAsync(req.body || {});
      return next();
    } catch (err: any) {
      err.status = 422;
      return next(err);
    }
  }
}

export default new UserMiddleware();
