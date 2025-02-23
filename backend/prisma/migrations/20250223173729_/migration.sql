/*
  Warnings:

  - You are about to drop the column `lastOtp` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "lastOtp",
ADD COLUMN     "otp" TEXT;
