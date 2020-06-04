const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

const  mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/setuptalk', 
    {user: 'setuptalker',pass: 'SetupTalker!0', useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);