const usuariosHandler = require("./controllers/usuarios_handler.js");
const usuariosMapper = require("./controllers/usuariosMapper.js");

function isAdmin(req, res, next) {
  let token = req.headers.user_id;
  let decoded;
  try {
    decoded = usuariosMapper.jwt.verify(token, usuariosMapper.seed);
    console.log(decoded);
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

function whatsRol(req, res, next) {
  let token = req.headers.user_id;
  let decoded;
  try {
    decoded = usuariosMapper.jwt.verify(token, usuariosMapper.seed);
    console.log(decoded);
  } catch (err) {
    res.status(401).send({ error: "Token invalido", TipoDeError: `${err}` });
  }
  if (decoded.rol === 1) {    
    req.params.rol=1;
    next();
  } else {
    req.params.rol=0;   
    next()
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



module.exports = { isAdmin, isAuthenticated,whatsRol};
