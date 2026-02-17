import jwt from "jsonwebtoken";

export function generateToken(userId: string): string {
  return jwt.sign({ user: userId }, process.env.JWT_SECRET!, {
    expiresIn: +process.env.JWT_EXPIRY!,
  });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, process.env.JWT_SECRET!);
}
