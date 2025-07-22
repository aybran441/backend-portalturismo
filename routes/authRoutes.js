const express = require('express'); // Importa o framework Express
const router = express.Router();    // Cria uma instância do roteador do Express
const auth = require('../controllers/authController'); // Importa o controller responsável pela autenticação

// Define uma rota POST para '/login' que chama a função 'login' do controller 'auth'
router.post('/login', auth.login);

// Exporta o roteador para ser usado na aplicação principal
module.exports = router;