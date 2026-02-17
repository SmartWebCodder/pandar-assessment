import { Request, Response, NextFunction } from "express";

import userService from "../services/user.service";

class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.createUser(req.body);
      return res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  }
}

export default new UserController();
