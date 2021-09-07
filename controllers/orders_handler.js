const sequelize = require('../conexionBD.js');

async function createOrder(userId,order){////aca hay que hacer esta funcion
     let user=userId;
    await sequelize.query("INSERT INTO orders VALUES (NULL, :status, :amount, :description, :payment_method, :order_time, :user_id )", {
        replacements: {
            status: "Nuevo",
            amount: order.amount,
            description: order.description,                
            payment_method: order.payment_method,
            order_time: 1230,
            user_id: user,           
        },
        type: sequelize.QueryTypes.INSERT
});
}
async function getOrders(){////aca hay que hacer esta funcion
    let ordersArray= await sequelize.query('SELECT * FROM users', {
        type: sequelize.QueryTypes.SELECT
});
return ordersArray;
}

module.exports = { getOrders, createOrder }