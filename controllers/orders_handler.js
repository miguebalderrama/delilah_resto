const sequelize = require('../conexionBD.js');

async function createOrder(userId,order){////aca hay que hacer esta funcion
     let user=userId;
     let orderTime = new Date().toLocaleTimeString();
    let orderId=await sequelize.query("INSERT INTO orders VALUES (NULL, :status, :amount, :description, :payment_method, :order_time, :user_id )", {
        replacements: {
            status: "Nuevo",
            amount: order.amount,
            description: order.description,                
            payment_method: order.payment_method,
            order_time: orderTime,
            user_id: user,           
        },
        type: sequelize.QueryTypes.INSERT
});
return orderId;
}
async function createOrderPedido(orderId,products){
    console.log("aca imprimimos lo que recibimos para la tabla intermedia");
    console.log(orderId);
    products.forEach(function algo(element) {
        sequelize.query("INSERT INTO orders_products VALUES (NULL, :order_id, :product_id, :quantity_products )", {
            replacements: {
                order_id: orderId,
                product_id: element.product_id,
                quantity_products: element.quantity              
                          
            },
            type: sequelize.QueryTypes.INSERT
    });
    });
    
}

async function getOrders(rol,userid){////aca hay que hacer esta funcion
    let user=userid;
    if (rol) {
        let ordersArray= await sequelize.query(`SELECT * FROM orders INNER JOIN orders_products ON orders.order_id =orders_products.order_id INNER JOIN products ON orders_products.product_id = products.product_id INNER JOIN users ON orders.user_id = users.User_id`, {
            type: sequelize.QueryTypes.SELECT
    });
    return ordersArray;
    } else {
        let ordersArray= await sequelize.query(`SELECT * FROM orders INNER JOIN orders_products ON orders.order_id =orders_products.order_id INNER JOIN products ON orders_products.product_id = products.product_id INNER JOIN users ON orders.user_id = users.User_id WHERE orders.User_id=${user}`, {
            type: sequelize.QueryTypes.SELECT
    }); 
    return ordersArray; 
    }
    
}

module.exports = { getOrders, createOrder,createOrderPedido }