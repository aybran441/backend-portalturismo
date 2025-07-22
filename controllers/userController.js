const bcrypt = require('bcryptjs'); // Biblioteca para hash de senhas
const User = require('../models/Users'); // Modelo User para interação com o banco de dados

// Função para criar um novo usuário
exports.createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Valida se os campos obrigatórios foram preenchidos
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }

      // Verifica se o email já está cadastrado no banco
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'Email já cadastrado.' });
      }

      // Criptografa a senha do usuário antes de salvar
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria o novo usuário no banco com a senha criptografada
      const newUser = await User.create({ name, email, password: hashedPassword });

      // Retorna os dados do usuário criado, sem a senha
      const { id } = newUser;
      res.status(201).json({ id, name, email });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

// Função para listar todos os usuários cadastrados (sem senhas)
exports.listUser =  async (_req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'] // Campos retornados
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor.', error });
    }
  }

// Função para listar um usuário específico pelo ID (sem senha)
exports.listUserById = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'] // Campos retornados
      });

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor.', error });
    }
  }

// Função para deletar um usuário pelo ID
exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      // Remove o usuário do banco
      await user.destroy();
      res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor.', error });
    }
  }

// Função para atualizar dados de um usuário existente
exports.updateUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      // Atualiza o nome caso tenha sido enviado
      if (name) user.name = name;

      // Atualiza o e-mail, após verificar se não está sendo usado por outro usuário
      if (email && email !== user.email) {
        const existing = await User.findOne({ where: { email } });
        if (existing) {
          return res.status(400).json({ message: 'Email já está em uso.' });
        }
        user.email = email;
      }

      // Atualiza a senha, criptografando antes de salvar
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }

      // Salva as alterações no banco
      await user.save();

      // Retorna a confirmação e os dados atualizados (sem senha)
      res.status(200).json({
        message: 'Usuário atualizado com sucesso.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          updatedAt: user.updatedAt
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor.', error });
    }
  }