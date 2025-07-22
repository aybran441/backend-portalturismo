// Importa a classe Sequelize do pacote sequelize para configurar a conexão com o banco de dados
const { Sequelize } = require('sequelize')

// Importa o pacote dotenv para carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// Cria uma nova instância do Sequelize, configurando a conexão com o banco MySQL
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Nome do banco de dados, obtido das variáveis de ambiente
    process.env.DB_USER,      // Usuário do banco, obtido das variáveis de ambiente
    process.env.DB_PASSWORD,  // Senha do banco, obtida das variáveis de ambiente
    {
        host: process.env.DB_HOST,  // Endereço do servidor do banco de dados
        dialect: 'mysql',           // Dialeto do banco, aqui MySQL
        logging: false              // Desativa logs SQL no console para não poluir a saída
    }
)

// Exporta a instância do Sequelize para ser usada em outras partes da aplicação
module.exports = sequelize;