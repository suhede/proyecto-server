const express = require('express');

const router = express.Router(); 

const UsuController = require('../controllers/userController')

router.post('/',UsuController.getUsuario);
router.get('/', UsuController.getUsuarios);

module.exports = router; 