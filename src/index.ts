import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import { sessionMiddleware } from './middleware/session-middleware';
import { corsFilter } from './middleware/cors-filter';
import { Pool } from 'pg';
import { EmployeeRouter } from './routers/employee-router';
import { AuthRouter } from './routers/auth-router';
import { ReimbRouter } from './routers/reimb-router';

// environment configuration
dotenv.config();

// database configuration
export const connectionPool: Pool = new Pool({
    host: process.env['DB_HOST'],
    port: +process.env['DB_PORT'],
    database: process.env['DB_NAME'],
    user: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    max: 5
});

// logging configuration
fs.mkdir(`${__dirname}/logs`, () => {});
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

// web server configuration
const app = express();
app.use(morgan('combined', { stream: logStream }));
app.use(sessionMiddleware);
app.use(corsFilter);
app.use('/', express.json());
app.use('/employees', EmployeeRouter);
app.use('/reimb', ReimbRouter);
app.use('/auth', AuthRouter);


app.listen(8080, () => {
    console.log(`Application running and listening at: `);
});
