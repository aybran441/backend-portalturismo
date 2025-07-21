const Contact = require('../models/Contact');
 
exports.createContact = async (_req, res) => {
    try {
        const contact = await Contact.findAll({
            attributes: ['id', 'name', 'email', 'message', 'createdAt', 'updatedAt']
        });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor.', error });
    }
}
 
exports.listContact = async (req, res) => {
    try {
        const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
        res.json(contacts);
    } catch (error) {
        console.error('Erro ao listar contatos:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}
 