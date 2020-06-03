const { Router }  = require('express');
const TopicController = require('./controllers/TopicController');


const routes = Router();

routes.get('/topics', TopicController.index)
routes.post('/topics', TopicController.store);

module.exports = routes;