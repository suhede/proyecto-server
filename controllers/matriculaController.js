const mongoose = require("mongoose");
const db = require("../basedatos");
const Matriculas = mongoose.model("matriculas", {
  Nombre: String,
  Email: String,
  Curso: String,
});

//----------------------CONTROLADOR DE RUTA CREAR  Y LEER EL REGISTRO------------------------------------------

// Para obtener todo el registro
exports.getAllMatriculas = (req, res, next) => {
    try {
      Matriculas.find().then((doc) => {
        res.json({ arrayMatriculas: doc });
      });
    } catch (error) {
      next(error);
    }
  };
  
// Para crear  el registro
exports.getMatriculas = (req, res, next) => {
  let { Nombre, Email, Curso } = req.body;
  try {
    const matriculas = new Matriculas({
      Nombre: Nombre,
      Email: Email,
      Curso: Curso,
    });

    matriculas.save().then((doc) => {
      res.redirect(process.env.LINK_CLIENT);
    });
  } catch (error) {
    next(error);
  }
};


