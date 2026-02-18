const SYSTEM_ACCOUNT = "system";

interface Transaction {
  type: "credit" | "debit";
  amount: number;
  reference: string;
  createdAt: string;
  userId: string;
}

class TransactionRepo {
  private transactions: Transaction[] = [];

  createDoubleEntry(data: {
    amount: number;
    reference: string;
    userId: string;
    type: "credit" | "debit";
  }): void {
    const now = new Date().toISOString();

    this.transactions.push({
      type: data.type,
      amount: data.amount,
      reference: data.reference,
      userId: data.userId,
      createdAt: now,
    });

    this.transactions.push({
      type: data.type === "credit" ? "debit" : "credit",
      amount: data.amount,
      reference: data.reference,
      userId: SYSTEM_ACCOUNT,
      createdAt: now,
    });
  }

  findByUserId(
    userId: string,
    page: number,
    limit: number,
  ): { transactions: Transaction[]; total: number } {
    const userTransactions = this.transactions
      .filter((t) => t.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    const total = userTransactions.length;
    const start = (page - 1) * limit;
    const paginated = userTransactions.slice(start, start + limit);

    return { transactions: paginated, total };
  }
}

export default new TransactionRepo();
