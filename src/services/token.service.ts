import jwt from "jsonwebtoken";

export function generateToken(userId: string): string {
  return jwt.sign({ user: userId }, process.env.JWT_SECRET!, {
    expiresIn: +process.env.JWT_EXPIRY!,
  });
}

interface TokenPayload {
  user: string;
  iat: number;
  exp: number;
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
}
