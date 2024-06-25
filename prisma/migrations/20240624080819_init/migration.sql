-- AlterTable
ALTER TABLE "Spares" ADD COLUMN     "owcharge" TEXT NOT NULL DEFAULT 'null',
ADD COLUMN     "owstatus" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "partsentdate" TEXT NOT NULL DEFAULT 'null';
