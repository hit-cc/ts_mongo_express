import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import environment from "./../environment";

export const SECRET_KEY: Secret = environment.getAccessTokenPrivateKey();
export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (error) {
    res.status(401).send({ message: "Unuthenticated!" });
  }
};
