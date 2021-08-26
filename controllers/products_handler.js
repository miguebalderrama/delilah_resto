const sequelize = require('../conexionBD.js');

async function getProducts(){
    let productsArray= await sequelize.query('SELECT * FROM products', {
        type: sequelize.QueryTypes.SELECT
});
return productsArray;
}




module.export = {getProducts}