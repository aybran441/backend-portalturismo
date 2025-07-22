// Importa o modelo Contact para interagir com a tabela de contatos no banco
const Contact = require('../models/Contact');

// Função para buscar e retornar todos os contatos com campos específicos
exports.createContact = async (_req, res) => {
    try {
        // Busca todos os contatos, selecionando apenas os atributos indicados
        const contact = await Contact.findAll({
            attributes: ['id', 'name', 'email', 'message', 'createdAt', 'updatedAt']
        });
        // Retorna os contatos encontrados em formato JSON
        res.json(contact);
    } catch (error) {
        // Em caso de erro, retorna status 500 com mensagem e o erro
        res.status(500).json({ message: 'Erro interno do servidor.', error });
    }
}

// Função para listar todos os contatos ordenados pela data de criação (mais recentes primeiro)
exports.listContact = async (req, res) => {
    try {
        // Busca todos os contatos ordenados do mais novo para o mais antigo
        const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
        // Retorna os contatos em formato JSON
        res.json(contacts);
    } catch (error) {
        // Loga o erro no console para depuração
        console.error('Erro ao listar contatos:', error);
        // Retorna status 500 com mensagem de erro genérica
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}