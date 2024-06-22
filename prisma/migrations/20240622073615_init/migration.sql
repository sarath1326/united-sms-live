-- CreateTable
CREATE TABLE "Parts" (
    "id" SERIAL NOT NULL,
    "partname" TEXT NOT NULL,
    "partcode" TEXT NOT NULL,
    "customername" TEXT NOT NULL,
    "customernumber" TEXT NOT NULL,
    "warrantystatus" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "partsent" BOOLEAN NOT NULL DEFAULT false,
    "recevingdate" TEXT NOT NULL,

    CONSTRAINT "Parts_pkey" PRIMARY KEY ("id")
);
