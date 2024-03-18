import {Router} from 'express'
import { updateTime, getTime, createTime} from '../Controllers/timeController.js'

const timeRouter = Router();

timeRouter.post('/updateTime', updateTime);
timeRouter.get('/getTime/:id', getTime);
timeRouter.post('/createTime', createTime);

export default timeRouter;