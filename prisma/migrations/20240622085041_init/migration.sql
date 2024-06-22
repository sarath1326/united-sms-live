/*
  Warnings:

  - You are about to drop the `Parts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Parts";

-- CreateTable
CREATE TABLE "Spares" (
    "id" SERIAL NOT NULL,
    "partname" TEXT NOT NULL,
    "partcode" TEXT NOT NULL,
    "customername" TEXT NOT NULL,
    "customernumber" TEXT NOT NULL,
    "warrantystatus" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "partsent" BOOLEAN NOT NULL DEFAULT false,
    "recevingdate" TEXT NOT NULL,

    CONSTRAINT "Spares_pkey" PRIMARY KEY ("id")
);
