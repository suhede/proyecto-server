const express = require("express");
// compresion de texto para mejorar el rendimiento
const compression = require("compression");
const zlib = require('zlib');
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

//-------------DOTENV---------------------
require("dotenv").config();

//----------------------------------

const db = require("./basedatos");
const usuariosDb = require("./routes/userRoute");
const articulosDb = require("./routes/articulosRoute");
const listaArticulosDb = require("./routes/articulosRoute");
const matriculaDb = require("./routes/matriculaRoute");
const proyectosGaleria = require("./routes/proyectosRoute");

//------------------APP.USES----------------------
const app = express();

// Para habilitar la compresión
app.use(compression({
  level:  zlib.constants.Z_BEST_COMPRESSION,
  threshold: 0, // Comprime todos los archivos, sin importar su tamaño
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Comprimir si el tipo de contenido es uno de estos
    return /json|text|javascript|css|html/.test(res.getHeader('Content-Type'));
  }
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Middleware para asegurar el encabezado Cache-Control
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 año
  next();
});

//----Rutas-------------------------------------------
app.use("/usuarios", usuariosDb);
app.use("/matriculas", matriculaDb);
app.use("/articulos", articulosDb);
app.use("/lista", listaArticulosDb);
app.use("/proyectos", proyectosGaleria);

// Archivos estáticos------
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.get('/',(req,res)=>{

  try{
    res.status(200).json('Url lanzada en ruta de inicio /')
  }catch (error){
    res.status(500).json('Error dentro de Express')
  }

});
//----Middleware  -de manejo de errores-------
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json("Algo ha fallado!!");
});


//-------------------PORT------------------------

app.listen(process.env.PORT, () => {
  console.log("Servidor encendido");
});
