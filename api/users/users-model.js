const db = require('../../database/dbConfig'); 

const getAll = () => {
  return db('users as u')
    .select('id', 'username', 'department');
}; 

const addUser = (user) => {
  return db('users').insert(user); 
};

const findBy = (filter) => {
  return db('users').where(filter).first();
};

module.exports = {
  getAll,
  addUser,
  findBy
};
