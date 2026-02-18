import userRepo from "../repository/user.repo";
import transactionRepo from "../repository/transaction.repo";
import idempotencyRepo from "../repository/idempotency.repo";

const userLocks: Map<string, Promise<any>> = new Map();

class WithdrawService {
  async withdraw(userId: string, amount: number, idempotencyKey: string) {
    if (idempotencyRepo.exists(idempotencyKey)) {
      return idempotencyRepo.get(idempotencyKey);
    }

    // Serialize per-user to prevent concurrent withdrawals from overdrawing
    const prev = userLocks.get(userId) || Promise.resolve();
    const current = prev.then(() =>
      this.processWithdraw(userId, amount, idempotencyKey),
    );
    userLocks.set(
      userId,
      current.catch(() => {}),
    );

    return current;
  }

  private processWithdraw(
    userId: string,
    amount: number,
    idempotencyKey: string,
  ) {
    if (idempotencyRepo.exists(idempotencyKey)) {
      return idempotencyRepo.get(idempotencyKey);
    }

    const user = userRepo.findById(userId);

    if (!user) {
      const err: any = new Error("User not found");
      err.status = 404;
      throw err;
    }

    if (amount > user.balance) {
      const err: any = new Error("Insufficient balance");
      err.status = 400;
      throw err;
    }

    userRepo.updateBalance(userId, -amount);

    transactionRepo.create({
      type: "withdraw",
      amount,
      reference: idempotencyKey,
      userId,
    });

    const response = {
      message: "Withdrawal successful",
      data: { balance: user.balance },
    };

    idempotencyRepo.set(idempotencyKey, response);

    return response;
  }
}

export default new WithdrawService();
