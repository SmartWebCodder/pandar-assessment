import { Request, Response, NextFunction } from "express";

import sanitizer from "../lib/sanitizer";
import balanceSchema from "../schemas/balance.schema";

class BalanceMiddleware {
  async addBalance(req: Request, res: Response, next: NextFunction) {
    try {
      sanitizer(req.body);
      await balanceSchema.addBalance.validateAsync(req.body || {});

      const idempotencyKey = req.headers["idempotency-key"];

      if (!idempotencyKey) {
        const err: any = new Error("Idempotency-Key header is required");
        err.status = 400;
        throw err;
      }

      return next();
    } catch (err: any) {
      if (!err.status) err.status = 422;
      return next(err);
    }
  }
}

export default new BalanceMiddleware();
