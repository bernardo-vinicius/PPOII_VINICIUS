/**
 * Controlador para a lógica de autenticação.
 * Contém as funções para registrar e logar usuários.
 */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Registra um novo usuário
exports.register = async (req, res, next) => {
  
  try {
    const { email, senha, nome } = req.body; // Obter email, senha e nome do corpo da requisição

    // Verificar se o email já está cadastrado
    const existingUser = await prisma.usuario.findUnique({ where: { email: email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Já existe um usuário cadastrado com este email.' });
    }

    // Validar email e senha novamente no servidor
    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    // Criptografar a senha e salvar o usuário no banco de dados
    const senha_hash = await bcrypt.hash(senha, 12);
    const usuario = await prisma.usuario.create({
      data: { email, senha: senha_hash, nome },
    });

    // Retornar o usuário e um token JWT para autenticação pós registro no frontend
    // O http 201 indica que o registro foi bem-sucedido e um novo recurso foi criado no banco de dados (o usuário)
    const token = jwt.sign({ userId: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, usuario: { id: usuario.id, email: usuario.email, nome: usuario.nome } });
    
  } catch (error) {
    next(error);  // Passa o erro para o middleware de erro
  }
};

// Autenticar um usuário existente
exports.login = async (req, res, next) => {
  try {
    const { email, senha } = req.body; // Obter email e senha do corpo da requisição
    
    // Procurar o usuário pelo email
    const usuario = await prisma.usuario.findUnique({ where: { email: email } });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    // Verificar se a senha está correta
    const validPass = await bcrypt.compare(senha, usuario.senha);
    if (!validPass) {
      return res.status(401).json({ message: 'Senha inválida.' });
    }

    // Gerar um token JWT
    // O token contém o ID do usuário e é assinado com uma chave secreta
    const token = jwt.sign({ userId: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, usuario: { id: usuario.id, email: usuario.email, nome: usuario.nome } });
  } catch (error) {
    next(error);  // Passa o erro para o middleware de erro
  }
};