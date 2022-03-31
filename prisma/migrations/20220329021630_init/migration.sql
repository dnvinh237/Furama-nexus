-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "dayOfBirth" TEXT,
    "idCard" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT
);
