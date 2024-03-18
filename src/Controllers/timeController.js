import { updateTimeService, getTimeService, createTimeService } from '../Service/timeService.js';

// Controller for updating time records
export const updateTime = async (req, res) => {
    const timeDetails={
        EmployeeID: req.body.EmployeeID,
        ClockInTime: req.body.ClockInTime,
        ClockOutTime: req.body.ClockOutTime
      }
    console.log("Request Body:",timeDetails); // Log the request body
    try {
        const result = await updateTimeService(timeDetails.EmployeeID, timeDetails.ClockInTime, timeDetails.ClockOutTime);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }  
};

// Controller for creating time records
export const createTime = async (req, res) => {

      const employeeDetails={
        EmployeeID: req.body.EmployeeID,
        ClockInTime: req.body.ClockInTime,
        ClockOutTime: req.body.ClockOutTime
      }
    console.log("Request Body:",employeeDetails); // Log the request body
    try {
        const result = await createTimeService(employeeDetails.EmployeeID, employeeDetails.ClockInTime, employeeDetails.ClockOutTime);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }    
};


// Controller for getting time records
export const getTime = async (req, res) => {
    try {
        const id = req.params.id;
        const time = await getTimeService(id);
        if(time.length === 0){
            res.status(404).json({ message: 'Time not found' });
        } else {
            res.status(200).json(time);
        }
    } catch (error) {
        return error;
    }
}