CREATE DATABASE PROJECTX
USE PROJECTX

CREATE TABLE Employees(
    EmployeeID VARCHAR (100) PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Address VARCHAR(255),
    BirthDate DATE,
    ContactInfo VARCHAR(20),
    Gender VARCHAR(10),
    Position VARCHAR(255),
    PhotoURL VARCHAR(255),
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    HourlyRate DECIMAL(10,2),
    NHIFDeduction DECIMAL(10,2),
    NSSFDeduction DECIMAL(10,2),
    HELBDeduction DECIMAL(10,2)
);

SELECT * FROM employees

DROP TABLE Employees

INSERT INTO Employees (
    EmployeeID,
    FirstName,
    LastName,
    Address,
    BirthDate,
    ContactInfo,
    Gender,
    Position,
    PhotoURL,
    Email,
    Password,
    HourlyRate,
    NHIFDeduction,
    NSSFDeduction,
    HELBDeduction
) VALUES (
    1,
    'John',
    'Doe',
    '123 Main St',
    '1990-01-01',
    '123-456-7890',
    'Male',
    'Software Engineer',
    'https://example.com/photo.jpg',
    'john.doe@example.com',
    'hashedpassword123', -- You should store hashed passwords instead of plain text
    50.00,
    10.00,
    20.00,
    5.00
);
