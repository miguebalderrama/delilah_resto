const { Sequelize } = require('sequelize');
const ruta = 'mysql://root@localhost:3306/delilah_resto';

const myDatabase = new Sequelize(ruta);
myDatabase.authenticate()
    .then(message => console.log(message))
    .catch(error => console.error(message));

module.exports = myDatabase;