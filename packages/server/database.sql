CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL
);

CREATE TABLE psychologists
(
    "EmployeeID" INT,
    "FullName" TEXT,
    "Position" TEXT,
    "TitleOfCourtesy" TEXT ,
    "BirthDate" date,
    "HireDate" date,
    "Address" TEXT ,
    "City" TEXT,
    "Region" TEXT,
    "PostalCode" INT,
    "Country" TEXT,
    "HomePhone" INT,
    "Extension" INT,
    "Photo" TEXT,
    "Notes" TEXT,
    "ReportsTo" INT,
    CONSTRAINT psychologists_pkey PRIMARY KEY ("EmployeeID")
)

