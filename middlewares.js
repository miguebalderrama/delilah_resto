const usuariosHandler = require("./usuarios_handler.js");
const usuariosMapper = require("./usuariosMapper.js");

function isAdmin(req, res, next) {
  let token = req.headers.user_id;
  let decoded;
  try {
    decoded = usuariosMapper.jwt.verify(token, usuariosMapper.seed);
  } catch (err) {
    res.status(401).send({ error: "Token invalido", TipoDeError: `${err}` });
  }
  if (decoded.rol === 1) {
    next();
  } else {
    res.status(401).send({ error: "Usuario no autorizado" });
    return;
  }
}

function isAuthenticated(req, res, next) {
  let token = req.headers.user_id;
  let decoded;
  try {
    decoded = usuariosMapper.jwt.verify(token, usuariosMapper.seed);
  } catch (err) {
    res.status(401).send({ error: "Usuario no aunteticado", TipoDeError: `${err}` });
    return
  }
  
}



module.exports = { isAdmin, isAuthenticated};
