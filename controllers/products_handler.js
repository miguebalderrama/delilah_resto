const sequelize = require('../conexionBD.js');

async function getProducts(){
    let productsArray= await sequelize.query('SELECT * FROM products', {
        type: sequelize.QueryTypes.SELECT
});
return productsArray;
}

async function deleteProduct(productId){
    console.log(productId);
    console.log("queiro borrar el producto tal");
    let respuesta= await sequelize.query(`DELETE FROM products WHERE Product_id = :productId`, {
        replacements: {            
            productId: productId
        },
        type: sequelize.QueryTypes.SELECT
});

return respuesta;
}



module.exports = {getProducts, deleteProduct}