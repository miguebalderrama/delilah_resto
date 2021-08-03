const usuariosHandler = require('./usuarios_handler.js');

async function validarUsuario(req, res, next) {
    let usuariosArray = await usuariosHandler.autenticarUsuario(req.body.username, req.body.password);
    if (usuariosArray.length === 0) {
        res.status(403).send({error: 'Usuario y/o contraseña invalido'});
    }
    
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