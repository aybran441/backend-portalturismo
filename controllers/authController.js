// Importa a biblioteca bcryptjs para fazer a comparação de senhas com hash
const bcrypt = require('bcryptjs');
// Importa o modelo User para interagir com a tabela de usuários no banco
const User = require('../models/Users');

// Função assíncrona para realizar o login do usuário
exports.login = async (req, res) => {
    try {
        // Extrai email e senha do corpo da requisição
        const { email, password } = req.body;

        // Verifica se o email e a senha foram enviados; se faltar, retorna erro 400 (Bad Request)
        if (!email || !password) 
            return res.status(400).json({ message: 'email e senha são obrigatorios' });

        // Busca o usuário no banco pelo email
        const user = await User.findOne({ where: { email } });

        // Se usuário não existir, retorna erro 404 (Not Found)
        if (!user) 
            return res.status(404).json({ message: 'Usuario não encontrado' });

        // Compara a senha fornecida com o hash armazenado no banco
        const passwordValid = await bcrypt.compare(password, user.password);

        // Se a senha não for válida, retorna erro 400 (Bad Request)
        if (!passwordValid) 
            return res.status(400).json({ message: 'email ou senha estão incorretos' });

        // Se tudo estiver correto, responde com sucesso e dados básicos do usuário (sem senha)
        res.json({
            message: 'Login realizado com sucesso',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        // Em caso de erro inesperado, retorna status 500 (Erro interno do servidor)
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}