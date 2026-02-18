const TTL = Number(process.env.IDEMPOTENCY_TTL) || 86400000;

class IdempotencyRepo {
  private keys: Map<string, { response: any; expiresAt: number }> = new Map();

  exists(key: string): boolean {
    const entry = this.keys.get(key);
    if (!entry) return false;
    if (Date.now() > entry.expiresAt) {
      this.keys.delete(key);
      return false;
    }
    return true;
  }

  get(key: string): any {
    const entry = this.keys.get(key);
    if (!entry) return undefined;
    return entry.response;
  }

  set(key: string, response: any): void {
    this.keys.set(key, { response, expiresAt: Date.now() + TTL });
  }
}

export default new IdempotencyRepo();
