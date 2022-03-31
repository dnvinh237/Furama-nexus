/*
  Warnings:

  - You are about to drop the column `password` on the `Employee` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "positionId" INTEGER,
    "divisionId" INTEGER,
    "educationDegreeId" INTEGER,
    CONSTRAINT "Employee_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Employee_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Employee_educationDegreeId_fkey" FOREIGN KEY ("educationDegreeId") REFERENCES "EducationDegree" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("createdAt", "divisionId", "educationDegreeId", "email", "id", "name", "positionId") SELECT "createdAt", "divisionId", "educationDegreeId", "email", "id", "name", "positionId" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
