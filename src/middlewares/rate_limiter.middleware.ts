import { Request, Response, NextFunction } from "express";

const requestCounts: Map<string, { count: number; resetTime: number }> =
  new Map();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 20;

class RateLimiter {
  limit(req: Request, res: Response, next: NextFunction) {
    const key = req.ip || "unknown";
    const now = Date.now();

    const entry = requestCounts.get(key);

    if (!entry || now > entry.resetTime) {
      requestCounts.set(key, { count: 1, resetTime: now + WINDOW_MS });
      return next();
    }

    if (entry.count >= MAX_REQUESTS) {
      return res
        .status(429)
        .json({ error: "Too many requests, try again later" });
    }

    entry.count++;
    return next();
  }
}

export default new RateLimiter();
