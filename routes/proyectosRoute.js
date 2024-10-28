const express = require('express');

const router = express.Router(); 

const proyectoController = require('../controllers/proyectController');

router.post('/', proyectoController.Proyectos);
router.get('/',proyectoController.AllProyectos);

module.exports = router; 