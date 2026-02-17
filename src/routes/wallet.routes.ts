import { Router } from "express";

import userController from "../controllers/user.controller";
import userMiddleware from "../middlewares/user.middleware";

import balanceController from "../controllers/balance.controller";
import balanceMiddleware from "../middlewares/balance.middleware";

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

export default walletRouter;
