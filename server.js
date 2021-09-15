const express = require("express");
const cors = require("cors");
const usuariosHandler = require("./controllers/usuarios_handler.js");
const ordersHandler = require("./controllers/orders_handler.js");
const productsHandler = require("./controllers/products_handler.js");
const usuariosMapper = require("./controllers/usuariosMapper.js");
const middlewares = require("./middlewares.js");
const sequelize = require("./conexionBD.js");
const { restart } = require("nodemon");

const server = express();

server.use(express.json()); //body parser
server.use(cors());
server.listen(3000, () => {
  console.log("Servidor en puerto 3000 en ejecucion");
});

//////////////// Users Routes////////////////////////////////
server.post("/registro", async (req, res) => {
  console.log(req.body);
  const user = ({username,password,nombre,apellido,email,telefono,direccion,} = req.body);
  console.log(`${username} - ${nombre} - ${apellido} - ${email} - ${telefono} - ${direccion}`);
   usuariosHandler.registrarUsuario(user);
  res.status(201).send({message:"usuario creado satisfactoriamente"});
});

server.get("/usuarios", middlewares.isAdmin, async (req, res) => {
  let usersArray = await usuariosHandler.getUsuarios();
  res.status(200).send(usersArray);
});

//=================== Endpoint Login===========================================
server.post("/login", async (req, res) => {
  let token = await usuariosMapper.validarUsuario(req.body.username,req.body.password);
  if (token) {
    res.status(200).send({ message: "Bienvenido usuario", token: token });
  } else {
    res.status(403).send({ message: "Usuario y/o contrasenia invalidos" });
  }
});

//=================== Products routes =========================================
server.get("/products", async (req, res) => {
  let productsArray = await productsHandler.getProducts();
  res.status(200).send(productsArray);
});
server.put("/product",middlewares.isAdmin, async (req, res) => {
  const productoUpdate = ({ Product_Id,Product_name,Product_price,Photo } = req.body);
  console.log(productoUpdate);
  let update = await productsHandler.updateProduct(productoUpdate);
  console.log("me ejecute");
  res.status(200).send(update);
});

server.delete("/product", middlewares.isAdmin, async (req, res) => {
  const productoId = ({ productId } = req.body);
  let respuesta = await productsHandler.deleteProduct(productoId.productId);
  if (respuesta[0].affectedRows) {
    res.status(200).send("Se ha borrado el registro satisfactoriamente");
  } else {
    res.status(200).send("No se ha borrado ninugun registro");
  }
});

server.post("/products", middlewares.isAdmin, (req, res) => {
  const product = ({ nombre, price, photo } = req.body);
  sequelize
    .query(
      "INSERT INTO products VALUES (NULL, :Product_name, :Product_price, :Photo)",
      {
        replacements: {
          Product_name: product.nombre,
          Product_price: product.price,
          Photo: product.photo,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    )
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
});

//////////////Orders /////////////////////////////////////

server.post("/order", middlewares.isAdmin, async (req, res) => {
  console.log(req.body);
  let userId = await usuariosMapper.obtenerUserId(req, res);
  const orderhalf = ({ products, payment_method,amount, description } = req.body);  
  let orderNew=await ordersHandler.createOrder(userId,orderhalf);
 let orderPedido= await ordersHandler.createOrderPedido(orderNew[0],orderhalf.products); 
  res.status(200).send({message:"pedido realizado"});
});

server.get("/orders",middlewares.whatsRol,async (req , res)=>{
console.log("el usuario es un:");
console.log(req.params.rol);
let rol=req.params.rol;
let userId = await usuariosMapper.obtenerUserId(req, res);
console.log("Cual e smi usuario??");
console.log(userId);
let respuesta= await ordersHandler.getOrders(rol,userId);
res.status(200).send(respuesta);

});

server.put("/order",middlewares.isAdmin,async (req , res)=>{
const updateOrder = ({orderId,state}=req.body);
let resultado = await ordersHandler.updateOrder(updateOrder);
res.status(200).send(resultado);
}); 

server.delete("/order/:id", middlewares.isAdmin, async (req, res) => {
  const orderId = req.params.id;
  console.log(orderId);
  let respuesta = await ordersHandler.deleteOrder(orderId);
  if (respuesta[0].affectedRows) {
    res.status(200).send("Se ha borrado la orden satisfactoriamente");
  } else {
    res.status(200).send("No se ha borrado ningun registro");
  }
});

////////////Manejo global de errores////////////////////
server.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(500).send(err);
  }
  next();
});