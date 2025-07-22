const express = require('express'); // Importa o framework Express
const router = express.Router();    // Cria uma instância do roteador do Express
const bcrypt = require('bcryptjs'); // Importa bcrypt para hash de senhas (não usado diretamente aqui)
const userController = require('../controllers/userController'); // Importa o controller para operações com usuário
const User = require('../models/Users'); // Importa o modelo User (não usado diretamente aqui)

// Rota POST para criar um novo usuário (registro) — rota pública
router.post('/', userController.createUser);

// Rota GET para listar todos os usuários
router.get('/', userController.listUser);

// Rota GET para buscar um usuário específico pelo ID
router.get('/:id', userController.listUserById);

// Rota PUT para atualizar dados de um usuário específico pelo ID
router.put('/:id', userController.updateUser);

// Rota DELETE para remover um usuário específico pelo ID
router.delete('/:id', userController.deleteUser);

// Exporta o roteador para ser utilizado na aplicação principal
module.exports = router;