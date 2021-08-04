const sequelize = require('./ConexionBD.js');

async function registrarUsuario(usuario) {
    await sequelize.query("INSERT INTO users VALUES (NULL, :username, :password, :firstname, :lastname, :email, :phone, :adress, 0 )", {
            replacements: {
                username: usuario.username,
                password: usuario.password,
                firstname: usuario.nombre,                
                lastname: usuario.apellido,
                email: usuario.email,
                phone: usuario.telefono,
               adress: usuario.direccion
            },
            type: sequelize.QueryTypes.INSERT
    });
}

async function autenticarUsuario(username, password) {
 let encontrado = await sequelize.query('SELECT * FROM users WHERE username = :username AND password = :password', {
                        replacements: {
                           username: username,
                           password: password
                       },
                       type: sequelize.QueryTypes.SELECT
  });
       return encontrado[0];
}



module.exports = { registrarUsuario, autenticarUsuario }