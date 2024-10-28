const mongoose = require('mongoose');
const db = require('../basedatos');
const Galeria = mongoose.model('proyectos',{
    Curso:String, 
    Autor:String,
    Titulo:String, 
    Imguno:String, 
    Imgdos:String, 
    Imgtres:String, 
    Imgcuatro:String, 
    Imgcinco:String, 
    Imgseis:String
});

//----------------------CONTROLADOR DE RUTA AGREGAR PROYECTO NUEVO------------------------------------------
exports.Proyectos = (req,res,next)=>{

   try {
    let {Curso,Titulo,Autor,Imguno,Imgdos,Imgtres,Imgcuatro,Imgcinco,Imgseis} = req.body;
    const galeria = new Galeria ({ 
        Curso:Curso, 
        Titulo:Titulo,
        Autor:Autor,
        Imguno:Imguno,
        Imgdos:Imgdos,
        Imgtres:Imgtres,
        Imgcuatro:Imgcuatro, 
        Imgcinco:Imgcinco, 
        Imgseis:Imgseis
    });
     
    galeria.save().then(doc =>{
        res.redirect(process.env.LINK_CLIENT);
   });

   } catch (error) {
    next(error);
   }
};

//----Se confirma los datos guardado en BD para su lectura- y visualización
exports.AllProyectos = (req,res,next)=>{

    try {
        Galeria.find().then(doc =>{
            res.json({proyectos:doc})    
        })
    } catch (error) {
      next(error);
    }
   
};

