class IdempotencyRepo {
  private keys: Map<string, any> = new Map();

  exists(key: string): boolean {
    return this.keys.has(key);
  }

  get(key: string): any {
    return this.keys.get(key);
  }

  set(key: string, response: any): void {
    this.keys.set(key, response);
  }
}

export default new IdempotencyRepo();
