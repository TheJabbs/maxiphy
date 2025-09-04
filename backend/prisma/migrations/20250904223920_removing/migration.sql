/*
  Warnings:

  - You are about to alter the column `progressMax` on the `Tasks` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `progress` on the `Tasks` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Integer`.

*/
-- AlterTable
ALTER TABLE "public"."Tasks" ALTER COLUMN "progressMax" SET DATA TYPE INTEGER,
ALTER COLUMN "progress" SET DATA TYPE INTEGER;
