-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "positionId" INTEGER,
    "divisionId" INTEGER,
    "educationDegreeId" INTEGER,
    CONSTRAINT "Employee_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Employee_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Division" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Employee_educationDegreeId_fkey" FOREIGN KEY ("educationDegreeId") REFERENCES "EducationDegree" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Position" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Division" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EducationDegree" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" TEXT,
    "endDate" TEXT,
    "deposit" TEXT,
    "totalMoney" TEXT,
    "employeeId" INTEGER,
    "customerId" INTEGER,
    CONSTRAINT "Contract_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Contract_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
