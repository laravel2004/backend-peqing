import { PrismaClient } from "@prisma/client";

export class NilaiRepository {
  private readonly prisma : PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
}