const mongoose = require("mongoose");
const db = require("../basedatos");
const Articulos = mongoose.model("articulos", {
  Nombre: String,
  Descripcion: String,
  Tutor: String,
  Duracion: String,
  Precio: Number,
  Imagen: String,
});

//----------------------CONTROLADORES RUTA CREAR------------------------------------------
exports.getArticulos = (req, res, next) => {
  try {
    //----Se crea lo nuevo en la base de datos-
    let { nombre, descripcion, tutor, duracion, precio, imagen } = req.body;
    const articulo = new Articulos({
      Nombre: nombre,
      Descripcion: descripcion,
      Tutor: tutor,
      Duracion: duracion,
      Precio: precio,
      Imagen: imagen,
    });

    //----Se pide que guarde lo creado en BD-
    articulo.save().then((doc) => {
      res.redirect(process.env.LINK_CLIENT);
    });
  } catch (error) {
    next(error);
  }
};
// //----Se confirma los datos guardado en BD para su lectura-
exports.getAllArticulos = (req, res, next) => {
  try {
    Articulos.find().then((doc) => {
      res.json({ arrayArticulos: doc });
    });
  } catch (error) {
    next(error);
  }
};
//----------------------CONTROLADOR RUTA DE LECTURA----------------------------------

exports.getListaArticulos = (req, res, next) => {
  try {
    Articulos.find().then((doc) => {
      res.json({
        status: "success",
        arrayArticulos: doc,
      });
    });
  } catch (error) {
    next(error);
  }
};

//-----------------------CONTROLADOR RUTA VISTA DE DETALLES DE CADA CURSO----------------------------------------
exports.getDetalles = (req, res, next) => {
  try {
    let id = req.params.id;
    Articulos.find({ _id: id }).then((doc) => {
      res.json({
        arrayArticulos: doc,
      });
    });
  } catch (error) {
    next(error);
  }
};
//------------------------------LISTA-PREVIA/INICIO-------------------------------------------------
exports.getListaPrevia = (req, res, next) => {
  try {
    Articulos.findAll().then((doc) => {
      res.json({
        status: "success",
        arrayArticulos: doc,
      });
    });
  } catch (error) {
    next(error);
  }
};
//----------------------CONTROLADORES RUTA DE EDICION--------------------------------
//----Se encuentra lo que se quiere editar-
exports.getActualizar = (req, res, next) => {
  let id = req.params.id;
  try {
    Articulos.find({ _id: id }).then((doc) => {
      if (doc.length != 1) {
        console.log("Articulo no existe");
      } else {
        console.log("Dato a actulizar");
        res.json(doc[0]);
      }
    });
  } catch (error) {
    next(error);
  }
};

//----Se especifica lo que se quiere editar-
exports.getEditar = (req, res, next) => {
  let id = req.params.id;
  let { Nombre, Descripcion, Tutor, Duracion, Precio, Imagen, _id } = req.body;

  try {
    Articulos.updateOne(
      { _id: _id },
      {
        $set: {
          Nombre: Nombre,
          Descripcion: Descripcion,
          Tutor: Tutor,
          Duracion: Duracion,
          Precio: Precio,
          Imagen: Imagen,
        },
      }
    ).then((result) => {
      res.json({ status: "Perfecto!" });
      console.log("Actulizacion a este dato");
      //Indica el campo que se ha modificado (como antes de...)
      //----Se actuliza lo editado-
    });
  } catch (error) {
    next(error);
  }
};

//-----------------------CONTROLADOR RUTA DE BORRADO----------------------------------------
exports.getEliminar = (req, res, next) => {
  let { _id } = req.body;
  try {
    Articulos.findByIdAndDelete({ _id: _id }).then((doc) => {
      console.log("Dato eliminado");
      res.json({ status: "Perfecto!" });
    });
  } catch (error) {
    next(error);
  }
};

//-----------------------CONTROLADOR RUTA DE BUSQUEDA----------------------------------------
exports.getBusqueda = (req, res, next) => {
  let id = req.params.id;

  try {
    Articulos.find({
      // expresion regular que permite que se busque escribiendo en minusculas o mayusculas
      $or: [
        { Nombre: { $regex: id, $options: "i" } },
        { Tutor: { $regex: id, $options: "i" } },
      ],
    }).then((doc, error) => {
      if (error || doc.length <= 0) {
        return res.status(404).json({
          mensaje: "error, no se han encontrado ningun curso"
        });
      } else {
        res.status(200).json({
          status: "success",
          mensaje: "curso encontrado",
          articulos: doc
        });
      }
    });
  } catch (error) {
    next(error);
  }
};
