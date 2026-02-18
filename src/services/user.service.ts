import crypto from "crypto";

import { generateToken } from "./token.service";
import userRepo from "../repository/user.repo";
import transactionRepo from "../repository/transaction.repo";

class UserService {
  async createUser(data: { email: string }) {
    const existingUser = userRepo.findByEmail(data.email);

    if (existingUser) {
      const err: any = new Error("An account already exists with this email");
      err.status = 400;
      throw err;
    }

    const userId = crypto.randomUUID();
    const walletBalance = 10000;

    const user = userRepo.create({
      id: userId,
      email: data.email,
      balance: walletBalance,
    });

    transactionRepo.createDoubleEntry({
      type: "credit",
      amount: walletBalance,
      reference: `initial-${userId}`,
      userId: user.id,
    });

    const token = generateToken(user.id);

    return {
      message: "Account created successfully",
      data: { email: user.email, token },
    };
  }
}

export default new UserService();
