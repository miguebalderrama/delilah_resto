//const { UPDATE } = require("sequelize/types/lib/query-types");
const sequelize = require("../conexionBD.js");

async function getProducts() {
  let productsArray = await sequelize.query("SELECT * FROM products", {
    type: sequelize.QueryTypes.SELECT,
  });
  return productsArray;
}

async function updateProduct(productoUpdate) {
  try {
    console.log(productoUpdate);
    let respuesta = await sequelize.query(
      `UPDATE products SET  Product_name=:Product_name, Product_price=:Product_price, Photo=:Photo  WHERE Product_id= :Product_id`,
      {
        replacements: {
          Product_id: productoUpdate.productId,
          Product_name: productoUpdate.nombre,
          Product_price: productoUpdate.price,
          Photo: productoUpdate.photo
        },
      }
    );
    return respuesta;
  } catch (err) {
    console.log(err); // TypeError: failed to promise
  }
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

module.exports = { getProducts, deleteProduct, updateProduct};
