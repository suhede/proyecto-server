const express = require('express');

const router = express.Router(); 

const registroController = require('../controllers/matriculaController');

router.get('/',registroController.getAllMatriculas);
router.post('/',registroController.getMatriculas);



module.exports = router; 