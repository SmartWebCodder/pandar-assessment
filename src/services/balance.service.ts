import userRepo from "../repository/user.repo";
import transactionRepo from "../repository/transaction.repo";
import idempotencyRepo from "../repository/idempotency.repo";

class BalanceService {
  getBalance(userId: string) {
    const user = userRepo.findById(userId);

    if (!user) {
      const err: any = new Error("User not found");
      err.status = 404;
      throw err;
    }

    return {
      data: { balance: user.balance },
    };
  }

  addBalance(userId: string, amount: number, idempotencyKey: string) {
    if (idempotencyRepo.exists(idempotencyKey)) {
      return idempotencyRepo.get(idempotencyKey);
    }

    const user = userRepo.findById(userId);

    if (!user) {
      const err: any = new Error("User not found");
      err.status = 404;
      throw err;
    }

    userRepo.updateBalance(userId, amount);

    transactionRepo.create({
      type: "credit",
      amount,
      reference: idempotencyKey,
      userId,
    });

    const response = {
      message: "Balance added successfully",
      data: { balance: user.balance },
    };

    idempotencyRepo.set(idempotencyKey, response);

    return response;
  }
}

export default new BalanceService();
