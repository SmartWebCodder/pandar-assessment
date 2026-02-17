import { Response, NextFunction } from "express";

import CustomRequest from "../lib/custom.request";
import { verifyToken } from "../services/token.service";

class AuthMiddleware {
  async authenticateUser(
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        const err: any = new Error("Authentication required");
        err.status = 401;
        throw err;
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token);
      req.user = decoded.user;
      return next();
    } catch (err: any) {
      if (!err.status) err.status = 401;
      return next(err);
    }
  }
}

export default new AuthMiddleware();
