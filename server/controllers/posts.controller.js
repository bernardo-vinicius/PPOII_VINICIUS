/**
 * Controlador para a lógica de postagens.
 * Contém as funções para buscar e criar postagens.
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Busca todas as postagens, incluindo o nome do autor
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await prisma.postagem.findMany({
      orderBy: { data_criacao: 'desc' },
      include: { autor: { select: { nome: true } } },
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Cria uma nova postagem, associando-a ao usuário autenticado
exports.createPost = async (req, res, next) => {
  try {
    const { titulo, corpo } = req.body;
    const autorId = req.user.userId; // ID do usuário vem do middleware de auth
    const postagem = await prisma.postagem.create({
      data: { titulo, corpo, autorId },
    });
    res.status(201).json(postagem);
  } catch (error) {
    next(error);
  }
};