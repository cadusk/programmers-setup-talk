const express = require('express');
const app = express();
const routes = require('./routes');

const  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/setuptalk', 
    {user: 'setuptalker',pass: 'SetupTalker!0', useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(routes);

app.listen(3333);