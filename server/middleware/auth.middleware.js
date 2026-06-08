/**
 * Middleware para proteger rotas.
 * Verifica a validade do JWT enviado no cabeçalho Authorization.
 * Se válido, anexa o payload do usuário ao objeto `req`.
 */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ');
    if (!token) throw new Error('Autenticação falhou!');
    const decodedToken = jwt.verify(token[1], process.env.JWT_SECRET);
    req.user = { userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Autenticação falhou!' });
  }
};