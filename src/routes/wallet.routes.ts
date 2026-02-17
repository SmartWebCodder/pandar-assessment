import { Router } from "express";

import userController from "../controllers/user.controller";
import userMiddleware from "../middlewares/user.middleware";

import balanceController from "../controllers/balance.controller";
import balanceMiddleware from "../middlewares/balance.middleware";

import withdrawController from "../controllers/withdraw.controller";
import withdrawMiddleware from "../middlewares/withdraw.middleware";

import transactionController from "../controllers/transaction.controller";

import authMiddleware from "../middlewares/auth.middleware";

const walletRouter: any = Router();

walletRouter.post(
  "/user",
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
  authMiddleware.authenticateUser,
  balanceMiddleware.addBalance,
  balanceController.addBalance,
);

walletRouter.post(
  "/withdraw",
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
