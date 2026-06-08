/**
 * Define as rotas relacionadas às postagens (/api/posts).
 * Mapeia os endpoints para buscar todas as postagens e criar uma nova postagem.
 * A rota de criação é protegida pelo middleware de autenticação.
 */
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', postsController.getAllPosts);
router.post('/', authMiddleware, postsController.createPost);
// Aqui vai as rotas get/post de dados dos animais

module.exports = router;