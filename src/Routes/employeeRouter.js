import {Router} from 'express';
import {createEmployee, getAllEmployees, employeeLogin, fireEmployee, getEmployeeById} from '../Controllers/employeeController.js'

const employeeRouter = Router();

employeeRouter.post('/employee/register', createEmployee);
employeeRouter.get('/employee' , getAllEmployees);
employeeRouter.get('/employee/:id' , getEmployeeById);
employeeRouter.post('/employee/login', employeeLogin);
employeeRouter.delete('/employee/:id', fireEmployee);

export default employeeRouter;