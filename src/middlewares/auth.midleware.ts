import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

export class AuthMiddleware {

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const prisma: PrismaClient = new PrismaClient();
      const header = req.headers.authorization;
      if (!header) {
        return res.status(403).send({
          status: 'error',
          message: 'A token is required for authentication'
        });
      }

      const token = header.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id
        }
      });

      if (!user) {
        return res.status(401).send({
          status: 'error',
          message: 'Invalid Token'
        });
      }

      next();

    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send({
          status: 'error',
          message: 'Token has expired'
        });
      }

      console.log(err);
      return res.status(500).send({
        status: 'error',
        message: 'Server Internal Error'
      });
    }
  }
}
