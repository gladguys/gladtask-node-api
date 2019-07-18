const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const cors = require('cors');

const HeadersMiddleware = require('./middlewares/headersMiddleware');
//const DefaultErrorHandlerMiddleware = require('./middlewares/defaultErrorHandlerMiddleware');
const config = require('./config');

const app = express();
mongoose.connect(config.url_connection, { useNewUrlParser: true }).then();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(HeadersMiddleware);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/teams', require('./routes/teamRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/invitations', require('./routes/invitationRoutes'));

//app.use(DefaultErrorHandlerMiddleware);

module.exports = app;
