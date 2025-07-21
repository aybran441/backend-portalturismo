const express = require('express');
const router = express.Router();
const contact = require('../controllers/contactController');
 
 
// Criar um novo contato
router.post('/', contact.createContact);
 
// Listar todos os contatos
router.get('/', contact.listContact);
 
module.exports = router;
 
 