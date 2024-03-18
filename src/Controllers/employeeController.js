import { employeeLoginValidator, employeeValidator } from '../Validator/employeeValidator.js'
import { hashPassword, sendServerError, sendCreated, sendDeleteSuccess, sendNotFound } from '../Helper/helper.js';
import { response } from 'express';
import { loginEmployeeService, addEmployeeService, getAllEmployeesService, getEmployeeByIdService, fireEmployeeService } from '../Service/employeeService.js';


export const createEmployee = async (req, res) => {
    const employeeData = req.body;

    // Validate employee data
    const { error } = employeeValidator(employeeData);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Add employee
        const response = await addEmployeeService(employeeData);
        if (response instanceof Error) {
            return sendServerError(res, response.message);
        } else {
            return sendCreated(res, 'Employee created successfully');
        }
    } catch (error) {
        return sendServerError(res, error.message);
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const results = await getAllEmployeesService()
        const users = results.recordset
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(500).json("Internal server error");
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////
export const employeeLogin = async (req, res) => {
    const { Email, Password } = req.body;
    const { error } = employeeLoginValidator({ Email, Password });
    if (error) {
        return res.status(400).json(error.details[0].message);
    } else {
        try {
            const employeeResponse = await loginEmployeeService(Email, Password);
            if (!employeeResponse || employeeResponse.length === 0) {
                // No employee found with the provided email and password
                return res.status(400).json("Invalid credentials");
            } else {
                console.log(employeeResponse);
                return res.status(200).send(employeeResponse);
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
};

/////////////////////////////////////////////////////////////////////////////////////////

export const fireEmployee = async (req, res) =>{
    try {
        const id = req.params.id;
        const employeeToFire = await getEmployeeByIdService(id);
        if(employeeToFire.length === 0){
            sendNotFound(res, 'Employee Not Found');
        } else{
            const response = await fireEmployeeService(id);
            if(response.message){
                sendServerError(res, response.message);
            } else{
                sendDeleteSuccess(res, `Employee with id: ${id} was deleted successfully `);
            }
        }
    } catch (error) {
        sendServerError(res, error.message)
    }
}
////////////////////////////////////////////////////////////////////////////
export const getEmployeeById = async (req, res) =>{
    try {
        const id = req.params.id;
        const employee = await getEmployeeByIdService(id);
        if(employee.length === 0){
            sendNotFound(res, 'Employee Not Found');
        } else{
            res.status(200).json(employee);
        }
    } catch (error) {
        sendServerError(res, error.message)
    }
}