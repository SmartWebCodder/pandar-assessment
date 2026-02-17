import { Router } from "express";

import userController from "../controllers/user.controller";
import userMiddleware from "../middlewares/user.middleware";

const walletRouter: any = Router();

walletRouter.post(
  "/user",
  userMiddleware.createUser,
  userController.createUser,
);

export default walletRouter;
