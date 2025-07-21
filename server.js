require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
 
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
 
// Permite requisições só do frontend (exemplo localhost:3000)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // métodos permitidos
  credentials: true // se quiser permitir cookies, tokens, etc.
}));
 
app.use(express.json());
 
 
// Middleware para parsear JSON no corpo da requisição
app.use(express.json());
 
// Rota base para teste rápido da API
app.get('/', (req, res) => res.send('API funcionando'));
 
// Rotas da API
 
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);
 
// Porta que o servidor vai escutar
const PORT = process.env.PORT;
 
// Conecta ao banco e inicia o servidor
sequelize.authenticate()
  .then(() => {
    console.log('🟢 Conectado ao banco MySQL!');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Modelos sincronizados!');
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch(err => console.error('🔴 Erro ao conectar/sincronizar:', err));
 