import { poolRequest, sql } from '../Utils/dbConnect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';




export const loginEmployeeService = async (email, password) => {
    try {
        const result = await poolRequest()
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .query("SELECT * FROM Employees WHERE Email = @Email AND Password = @Password");
        
        return result.recordset;
    } catch (error) {
        return error;
    }
}



export const addEmployeeService = async (employee) => {
    try {
        const {
            FirstName,
            LastName,
            Email,
            Password,
            Address,
            BirthDate,
            ContactInfo,
            Gender,
            Position,
            PhotoURL,
            HourlyRate,
            NHIFDeduction,
            NSSFDeduction,
            HELBDeduction,
            Role,
            ClockInTime,
            ClockOutTime,
            HoursWorked,
            Overtime
        } = employee;

        // Generate UUID for EmployeeID
        const EmployeeID = uuidv4();

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, 5); // 10 is the saltRounds

        const result = await poolRequest()
        .input('EmployeeID', sql.VarChar, EmployeeID)
        .input('FirstName', sql.VarChar, FirstName)
        .input('LastName', sql.VarChar, LastName)
        .input('Email', sql.VarChar, Email)
        .input('Password', sql.VarChar, hashedPassword)
        .input('Address', sql.VarChar, Address)
        .input('BirthDate', sql.Date, BirthDate)
        .input('ContactInfo', sql.VarChar, ContactInfo)
        .input('Gender', sql.VarChar, Gender)
        .input('Position', sql.VarChar, Position)
        .input('PhotoURL', sql.VarChar, PhotoURL)
        .input('HourlyRate', sql.Decimal(10, 2), HourlyRate)
        .input('GrossPay', sql.Decimal(10, 2), employee.GrossPay) // Include GrossPay
        .input('NHIFDeduction', sql.Decimal(10, 2), NHIFDeduction)
        .input('NSSFDeduction', sql.Decimal(10, 2), NSSFDeduction)
        .input('HELBDeduction', sql.Decimal(10, 2), HELBDeduction)
        .input('NetPay', sql.Decimal(10, 2), employee.NetPay) // Include NetPay
        .input('Role', sql.VarChar, Role)
        .input('ClockInTime', sql.VarChar, ClockInTime)
        .input('ClockOutTime', sql.VarChar, ClockOutTime)
        .input('HoursWorked', sql.Decimal(10, 2), HoursWorked)
        .input('Overtime', sql.Decimal(10, 2), Overtime)
        .query(`
            INSERT INTO Employees (EmployeeID, FirstName, LastName, Email, Password, Address, BirthDate, ContactInfo, Gender, Position, PhotoURL, HourlyRate, GrossPay, NHIFDeduction, NSSFDeduction, HELBDeduction, NetPay, Role, ClockInTime, ClockOutTime, HoursWorked, Overtime)
            VALUES (@EmployeeID, @FirstName, @LastName, @Email, @Password, @Address, @BirthDate, @ContactInfo, @Gender, @Position, @PhotoURL, @HourlyRate, @GrossPay, @NHIFDeduction, @NSSFDeduction, @HELBDeduction, @NetPay, @Role, @ClockInTime, @ClockOutTime, @HoursWorked, @Overtime)            
        `);
    
    

        return result.recordset;
    } catch (error) {
        return error;
    }
};


export const getAllEmployeesService=async(users)=>{
    try {
        const allUsers=await poolRequest().query(`SELECT * FROM Employees`)
        return allUsers
    } catch (error) {
        return error
    }
}


export const getEmployeeByIdService = async(id) =>{
    try {
        const result = await poolRequest()
        .input('EmployeeID', sql.VarChar, id)
        .query("SELECT * FROM Employees where EmployeeID = @EmployeeID");
        return result.recordset;
    } catch (error) {
        return error.message;
    }
}

export const fireEmployeeService = async (id) =>{
    try {
        const result = await poolRequest()
            .input('EmployeeID', sql.VarChar, id)
            .query("DELETE FROM Employees WHERE EmployeeID = @EmployeeID");

        return result;
    } catch (error) {
        return error;
    }
}
