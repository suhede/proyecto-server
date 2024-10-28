const express = require('express');

const router = express.Router(); 

const artController = require('../controllers/articulosController')

router.post('/',artController.getArticulos);
router.get('/',artController.getAllArticulos);
router.get('/lista',artController.getListaArticulos);
router.get('/previa',artController.getListaPrevia);
router.get('/lista/:id',artController.getDetalles);
router.get('/:id',artController.getActualizar);
router.put('/',artController.getEditar);
router.delete('/',artController.getEliminar);
router.get('/buscar/:id',artController.getBusqueda);


module.exports = router; 