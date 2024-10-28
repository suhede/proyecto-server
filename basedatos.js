const mongoose = require('mongoose');
require ('dotenv').config();
const bd = mongoose.connect(process.env.DB_CONNETION || '');

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Conexion a la base de datos exitosa')
});
connection.on('error', (err)=>{
    console.log('Error en la conexion:' +err)
});

module.exports = bd;