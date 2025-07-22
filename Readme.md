# Backend - Portal Nova Serra Azul

## Descrição

Backend da aplicação **Portal Nova Serra Azul**, um site de viagens focado em turismo e serviços da região Nova Serra Azul.  
Esta API foi construída com **Node.js**, **Express**, **Sequelize** (com MySQL), e utiliza **bcrypt** para gerenciamento seguro de senhas.

---

## Tecnologias Utilizadas

- Node.js  
- Express.js  
- Sequelize (ORM)  
- MySQL  
- bcryptjs (para hash de senha)  
- dotenv (para variáveis de ambiente)  
- Cors (se aplicável)  

---

## Funcionalidades

### Usuários

- Criar usuário (registro) com senha criptografada  
- Listar todos os usuários (sem senha)  
- Buscar usuário por ID  
- Atualizar dados do usuário (nome, email, senha)  
- Deletar usuário  

### Autenticação

- Login com validação de email e senha  

### Contatos

- Criar contato (nome, email, mensagem)  
- Listar contatos (ordenados pela data de criação)  

---

