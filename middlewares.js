const usuariosHandler = require('./usuarios_handler.js');
const jwt = require('jsonwebtoken');
const seed = '51mulad0res';

async function validarUsuario(req, res, next) {
    let encontrado = await usuariosHandler.autenticarUsuario(req.body.username, req.body.password);
    console.log(encontrado);
    if (encontrado.length === 0) {
        res.status(403).send({error: 'Usuario y/o contraseña invalido'});
    }
    let token;
    if(encontrado){
      token=jwt.sign({usuario:encontrado.Username, rol:encontrado.Admin_rol}, seed, {expireIn:'10m'});
    }   
    return token; 
    next();
}
const isAdmin = (req, res, next) => {
    if (true){//req.username.is_admin) {
        console.log("soy admin");
      next();
    } else {
      res.statusCode = 403;
      res.json({error: "No tiene permisos para realizar esta operación"});
    }
  }

module.exports = {validarUsuario, isAdmin};