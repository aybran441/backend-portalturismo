const { DataTypes } = require('sequelize'); // Importa os tipos de dados do Sequelize
const sequelize = require('../config/db'); // Importa a instância de conexão com o banco

// Define o modelo 'Contact' que representa a tabela 'Contacts' no banco de dados
const Contact = sequelize.define('contact', {
   
    id: {
        type: DataTypes.INTEGER,       // Tipo inteiro para o ID
        autoIncrement: true,           // Incrementa automaticamente (auto incremento)
        primaryKey: true,              // Define como chave primária da tabela
    },

    name: {
        type: DataTypes.STRING,        // Tipo string para nome
        allowNull: false,              // Campo obrigatório (não pode ser nulo)
    },

    email: {
        type: DataTypes.STRING,        // Tipo string para email
        allowNull: false,              // Campo obrigatório
        unique: true,                  // Define que o email deve ser único na tabela
    },

    message: {
        type: DataTypes.TEXT,          // Campo para texto longo (mensagem)
        allowNull: false,              // Campo obrigatório
    }
}, {
    tableName: 'Contacts',             // Nome explícito da tabela no banco
    timestamps: true,                  // Cria campos createdAt e updatedAt automaticamente
});

module.exports = Contact;             // Exporta o modelo para ser usado em outras partes da aplicação