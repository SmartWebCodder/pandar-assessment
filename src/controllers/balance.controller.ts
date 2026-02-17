import { Response, NextFunction } from "express";

import CustomRequest from "../lib/custom.request";
import balanceService from "../services/balance.service";

class BalanceController {
  async getBalance(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const result = balanceService.getBalance(req.user!);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }

  async addBalance(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const idempotencyKey = req.headers["idempotency-key"] as string;
      const result = balanceService.addBalance(
        req.user!,
        req.body.amount,
        idempotencyKey,
      );
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }
}

export default new BalanceController();
