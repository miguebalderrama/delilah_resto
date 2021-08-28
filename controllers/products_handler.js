const sequelize = require("../conexionBD.js");

async function getProducts() {
  let productsArray = await sequelize.query("SELECT * FROM products", {
    type: sequelize.QueryTypes.SELECT,
  });
  return productsArray;
}

async function deleteProduct(productId) {
  try {
    let respuesta = await sequelize.query(
      `DELETE FROM products WHERE Product_id = :productId`,
      {
        replacements: {
          productId: productId,
        },
      }
    );
    return respuesta;
  } catch (err) {   
    console.log(err); // TypeError: failed to promise
  }
}

module.exports = { getProducts, deleteProduct };
