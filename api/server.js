const express = require('express'); 
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan'); 

const server = express();

//GLOBAL MIDDLEWARE
server.use(express.json()); 
server.use(helmet()); 
server.use(cors()); 
server.use(morgan('tiny')); 

//Catch All End Point 
server.get('/', (req, res) => {
  res.json({ message: "API UP & RUNNING"}); 
}); 

module.exports = server; 
