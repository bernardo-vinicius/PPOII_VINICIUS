/**
 * Define as rotas relacionadas à autenticação (/api/auth).
 * Mapeia os endpoints de registro e login para suas respectivas
 * funções no controlador de autenticação.
 */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;