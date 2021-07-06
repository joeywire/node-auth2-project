//Storing our secret in our config file so it is auto git - ignored. 
//Need to keep your secret somewhere secure - not wide open in a github repo
const jwtSecret = process.env.JWT_SECRET || 'hushhhh'; 

module.exports = {
  jwtSecret
};