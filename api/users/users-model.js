const db = require('../../database/dbConfig'); 

const getAll = () => {
  return db('users as u')
    .select('id', 'username', 'department');
}; 

const addUser = (user) => {
  return db('users').insert(user); 
};

module.exports = {
  getAll,
  addUser
};
