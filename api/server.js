const express = require('express'); 
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan'); 

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router');
const { restrictAccess } = require('./auth/middleware');

const server = express();

//GLOBAL MIDDLEWARE
server.use(express.json()); 
server.use(helmet()); 
server.use(cors()); 
server.use(morgan('tiny')); 

//Routes
server.use('/api/auth', authRouter);
server.use('/api/users',restrictAccess, usersRouter);

//Catch All End Point 
server.get('/', (req, res) => {
  res.json({ message: "API UP & RUNNING"}); 
}); 

module.exports = server; 
