const db = require("../basedatos");
const mongoose = require("mongoose");
const Usuarios = mongoose.model("usuarios", {
  Nombre: String,
  Password: String,
});

//----------------------CONTROLADOR DE RUTA PARA COMPROBAR USUARIO----------------------------------

// Controlador para obtener todos los usuarios
exports.getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await Usuarios.find();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

// Controlador para comprobar los usuarios
exports.getUsuario = async (req, res, next) => {
  let { Nombre, Password } = req.body;

  try {
    const usuarios = new Usuarios({ Nombre: Nombre, Password: Password });
    const usuario = await Usuarios.findOne({Nombre: Nombre, Password: Password });
    if (!usuario || usuario.Password !== Password) {
      return res.json({
        status: "failed",
        error: "Usuario o Password incorrectos",
      });
    }
    res.json({
      status: "success",
      Nombre: Nombre,
    });
  } catch (error) {
   next(error);
  }
};
