const usuariosHandler = require("./usuarios_handler.js");
const sequelize = require('../conexionBD.js');
const jwt = require('jsonwebtoken');
const seed = '51mulad0res';

async function validarUsuario(usuario, contrasenia) {
    let encontrado = await usuariosHandler.autenticarUsuario(usuario, contrasenia);
    console.log(encontrado);
    console.log("esto hay en el mapper");   
   // }
    let token;
    if(encontrado){
      token=jwt.sign({usuario: encontrado.Username, rol: encontrado.Admin_rol}, seed, {expiresIn: '10m'});
    } 
    return token; 
   
}
async function obtenerUserId(req,res) {
  let token = req.headers.user_id;
  let decoded;
  try {
    decoded = jwt.verify(token, seed);    
  } catch (err) {
    res.status(401).send({ error: "Token invalido", TipoDeError: `${err}` });
  }
  if (decoded.usuario) {  
    let encontrado = await sequelize.query('SELECT * FROM users WHERE username = :username', {
      replacements: {
         username: decoded.usuario         
     },
     type: sequelize.QueryTypes.SELECT
});
console.log("esto me devuelve la consulata del username");
console.log(encontrado[0].User_id);
    return encontrado[0].User_id;//decoded.usuario;
  } else {
    res.status(401).send({ error: "Usuario no autorizado" });
    return;
  }
}

module.exports = { validarUsuario, seed, jwt, obtenerUserId}