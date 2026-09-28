-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLoginAt" TIMESTAMP(3),
ADD COLUMN     "rememberMe" BOOLEAN NOT NULL DEFAULT false;
