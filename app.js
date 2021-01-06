import { config } from "./config";
import { logger } from './logger';
import { headerMiddleware, responseInfoMiddleware } from './middlewares';

import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';
import teamRoutes from './routes/teamRoutes';
import projectRoutes from './routes/projectRoutes';
import invitationRoutes from './routes/invitationRoutes';
import emailRoutes from './routes/emailRoutes';

const express = require('express');
const winston = require('winston');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useCreateIndex: true }).then();

if (process.env.NODE_ENV !== 'prod') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

app.use(cors());
app.use(headerMiddleware);
app.use(responseInfoMiddleware);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;