import { Router, Request, Response } from "express";

import userController from "../controllers/user.controller";
import userMiddleware from "../middlewares/user.middleware";

import balanceController from "../controllers/balance.controller";
import balanceMiddleware from "../middlewares/balance.middleware";

import withdrawController from "../controllers/withdraw.controller";
import withdrawMiddleware from "../middlewares/withdraw.middleware";

import transactionController from "../controllers/transaction.controller";

import authMiddleware from "../middlewares/auth.middleware";
import rateLimiter from "../middlewares/rate_limiter.middleware";

const walletRouter = Router();

walletRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Wallet API is running" });
});

walletRouter.post(
  "/user",
  rateLimiter.limit,
  userMiddleware.createUser,
  userController.createUser,
);

walletRouter.get(
  "/balance",
  authMiddleware.authenticateUser,
  balanceController.getBalance,
);

walletRouter.post(
  "/add_balance",
  rateLimiter.limit,
  authMiddleware.authenticateUser,
  balanceMiddleware.addBalance,
  balanceController.addBalance,
);

walletRouter.post(
  "/withdraw",
  rateLimiter.limit,
  authMiddleware.authenticateUser,
  withdrawMiddleware.withdraw,
  withdrawController.withdraw,
);

walletRouter.get(
  "/transactions",
  authMiddleware.authenticateUser,
  transactionController.getTransactions,
);

export default walletRouter;
