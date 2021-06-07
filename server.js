const express = require('express');
const cors = require('cors');
const usuariosHandler = require('./usuarios_handler.js');
const middlewares = require('./middlewares.js')
const sequelize = require('./ConexionBD.js');


const server = express();
server.use(express.json()); //body parser
server.use(cors());
server.listen(3000, () => {
    console.log('Servidor en ejecucion');
});
//////////////// Endpoint Sign in//////////////////////////////// 
server.post('/registro', async (req, res) => {
    console.log(req.body);
    const user = {username, password, nombre, apellido, email, telefono, direccion} = req.body;
    console.log(`${username} - ${nombre} - ${apellido} - ${email} - ${telefono} - ${direccion}`);
    usuariosHandler.registrarUsuario(user)
    res.status(201).send({message: 'Usuario creado satisfactoriamente'});
})
/////////////// Endpoint Login///////////////////////////////////////////////
server.post('/login', middlewares.validarUsuario, async (req, res) => {
    
    res.status(200).send({message:"Usuario validado"});
});
// ========================= VerProductos ============================
server.get('/products', (req, res) => {
    sequelize.query('SELECT * FROM products', {type: sequelize.QueryTypes.SELECT}).then(products => {
      if (products.length === 0) {
        console.log(`No hay productos en Delilah Restó`);
        res.json({text: `No hay productos en Delilah Restó`, products: []})
      } else {
        console.log(`Estos son los productos de Delilah Restó: ${JSON.stringify(products)}`);
        res.json({text: 'Estos son los productos de Delilah Restó', products: products})
      }
    })
  })
  // ======================== CrearProductos ===========================
server.post('/products', middlewares.isAdmin, (req, res) => {
    const product = {nombre, price, photo} = req.body;
    sequelize.query("INSERT INTO products VALUES (NULL, :Product_name, :Product_price, :Photo)",{
          replacements: {
            Product_name: product.nombre,
            Product_price: product.price,
            Photo: product.photo,
          },
          type: sequelize.QueryTypes.INSERT
          
        })
      .then((sql_res) => {
        console.log(`El producto ha sido creado con éxito: ${sql_res}`);
        res.statusCode = 201;
        res.json({
          text: "¡El producto ha sido creado con éxito!",
          product: {
            id: Number(...sql_res),
            ...req.body,
          },
        });
      })
      .catch((e) => {
        res.statusCode = 400;
        console.error(
          `${e.message}\nEl producto no pudo ser creado, verifique la información e intente nuevamente`
        );
        res.json({
          error:
            "El producto no pudo ser creado, verifique la información e intente nuevamente",
        });
      });
  })
server.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        res.status(500).send(err);
    }
    next();
});