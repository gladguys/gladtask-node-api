import { config } from "./config";
import { headerMiddleware } from './middlewares/headersMiddleware';

import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';
import teamRoutes from './routes/teamRoutes';
import projectRoutes from './routes/projectRoutes';
import invitationRoutes from './routes/invitationRoutes';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/rootRouter')();

//const DefaultErrorHandlerMiddleware = require('./middlewares/defaultErrorHandlerMiddleware');

const app = express();
mongoose.connect(config.url_connection, { useNewUrlParser: true, useCreateIndex: true }).then();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(headerMiddleware);

express().use('/api', router);

//app.use(DefaultErrorHandlerMiddleware);

module.exports = app;
