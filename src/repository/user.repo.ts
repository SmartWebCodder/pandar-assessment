interface User {
  id: string;
  email: string;
  balance: number;
}

class UserRepo {
  private users: Map<string, User> = new Map();

  create(data: { id: string; email: string; balance: number }): User {
    const user: User = {
      id: data.id,
      email: data.email,
      balance: data.balance,
    };
    this.users.set(user.id, user);
    return user;
  }

  findById(id: string): User | undefined {
    return this.users.get(id);
  }

  findByEmail(email: string): User | undefined {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return undefined;
  }

  updateBalance(id: string, amount: number): User | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;
    user.balance += amount;
    return user;
  }
}

export default new UserRepo();
