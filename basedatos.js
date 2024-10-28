const mongoose = require('mongoose');
require ('dotenv').config();

const bd = mongoose.connect(process.env.DB_CONNECTION || '');
if (!bd) {
    console.error('DB_CONNECTION no está definida en las variables de entorno');
    process.exit(1);
  }

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Conexion a la base de datos exitosa')
});
connection.on('error', (err)=>{
    console.log('Error en la conexion:' +err)
});

module.exports = bd;