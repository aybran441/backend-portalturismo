const express = require('express'); // Importa o framework Express
const router = express.Router();    // Cria uma instância do roteador do Express
const contact = require('../controllers/contactController'); // Importa o controller responsável pelas operações de contato

// Rota POST para criar um novo contato. Chama a função createContact do controller
router.post('/', contact.createContact);

// Rota GET para listar todos os contatos. Chama a função listContact do controller
router.get('/', contact.listContact);

// Exporta o roteador para ser usado na aplicação principal
module.exports = router;