const db = require('../../database/dbConfig'); 

const getAll = () => {
  return db('users as u')
    .select('id', 'username', 'department');
}

module.exports = {
  getAll
};
