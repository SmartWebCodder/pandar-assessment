import transactionRepo from "../repository/transaction.repo";

class TransactionService {
  getTransactions(userId: string, page: number, limit: number) {
    const result = transactionRepo.findByUserId(userId, page, limit);

    return {
      data: {
        transactions: result.transactions.map((t) => ({
          type: t.type,
          amount: t.amount,
          reference: t.reference,
          createdAt: t.createdAt,
        })),
        pagination: {
          page,
          limit,
          total: result.total,
          totalPages: Math.ceil(result.total / limit),
        },
      },
    };
  }
}

export default new TransactionService();
