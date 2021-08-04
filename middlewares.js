const usuariosHandler = require('./usuarios_handler.js');
const jwt = require('jsonwebtoken');
const seed = '51mulad0res';


const isAdmin = (req, res, next) => {
    if (true){//req.username.is_admin) {
        console.log("soy admin");
      next();
    } else {
      res.statusCode = 403;
      res.json({error: "No tiene permisos para realizar esta operación"});
    }
  }

module.exports = { isAdmin};