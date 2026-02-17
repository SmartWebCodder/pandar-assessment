interface Transaction {
  type: "credit" | "withdraw";
  amount: number;
  reference: string;
  createdAt: string;
  userId: string;
}

class TransactionRepo {
  private transactions: Transaction[] = [];

  create(data: {
    type: "credit" | "withdraw";
    amount: number;
    reference: string;
    userId: string;
  }): Transaction {
    const transaction: Transaction = {
      type: data.type,
      amount: data.amount,
      reference: data.reference,
      userId: data.userId,
      createdAt: new Date().toISOString(),
    };
    this.transactions.push(transaction);
    return transaction;
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
