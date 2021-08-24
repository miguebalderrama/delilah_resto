const sequelize = require('../conexionBD.js');

async function createOrder(){////aca hay que hacer esta funcion
    let ordersArray= await sequelize.query('SELECT * FROM users', {
        type: sequelize.QueryTypes.SELECT
});
return ordersArray;
}
async function getOrders(){////aca hay que hacer esta funcion
    let ordersArray= await sequelize.query('SELECT * FROM users', {
        type: sequelize.QueryTypes.SELECT
});
return ordersArray;
}

module.exports = { getOrders, createOrder }