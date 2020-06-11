const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();
const { SERVER_HOST, SERVER_PORT, DB_HOST, DB_PORT } = process.env;

const  mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/setuptalk`, 
    {user: 'setuptalker',pass: 'SetupTalker!0', useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(SERVER_PORT, SERVER_HOST);
console.log(`Listening to ${SERVER_HOST} at port ${SERVER_PORT}`);
