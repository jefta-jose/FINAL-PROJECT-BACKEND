import express from 'express';
import bodyParser from 'body-parser';
import Logger from './src/Utils/Logger.js';
import dotenv from 'dotenv';
import cors from 'cors';
import employeeRouter from './src/Routes/employeeRouter.js';
import timeRouter from './src/Routes/timeRouter.js';

const app = express();
dotenv.config();

const port = process.env.API_PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get('/health', (req, res) => {
    res.status(200).send('I am very healthy💪');
});

// routes
app.use('/api', employeeRouter);
app.use('/api', timeRouter);

// Start the server
app.listen(port, () => {
    Logger.info(`Server running on http://localhost:${port}`);
});
