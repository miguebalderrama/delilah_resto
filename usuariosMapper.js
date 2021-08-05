const usuariosHandler = require("./usuarios_handler.js");
const jwt = require('jsonwebtoken');
const seed = '51mulad0res';

async function validarUsuario(usuario, contrasenia) {
    let encontrado = await usuariosHandler.autenticarUsuario(usuario, contrasenia);
    console.log(encontrado);
    console.log("esto hay en el mapper");
    //if (encontrado.length === 0) {
    //    res.status(403).send({error: 'Usuario y/o contraseña invalido'});
   // }
    let token;
    if(encontrado){
      token=jwt.sign({usuario: encontrado.Username, rol: encontrado.Admin_rol}, seed, {expiresIn: '10m'});
    } 
    return token; 
   
}

module.exports = { validarUsuario, seed, jwt}