import { Response, NextFunction } from "express";

import CustomRequest from "../lib/custom.request";
import transactionService from "../services/transaction.service";

class TransactionController {
  async getTransactions(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = transactionService.getTransactions(req.user!, page, limit);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }
}

export default new TransactionController();
