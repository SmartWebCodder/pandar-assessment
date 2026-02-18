import { Response, NextFunction } from "express";

import CustomRequest from "../lib/custom.request";
import withdrawService from "../services/withdraw.service";

class WithdrawController {
  async withdraw(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const idempotencyKey = `${req.user!}:${req.headers["idempotency-key"] as string}`;
      const result = await withdrawService.withdraw(
        req.user!,
        req.body.amount,
        idempotencyKey,
      );

      if (result.replayed) {
        res.setHeader("Idempotent-Replayed", "true");
        const { replayed, ...cached } = result;
        return res.status(200).json(cached);
      }

      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }
}

export default new WithdrawController();
