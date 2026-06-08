/**
 * Middleware de tratamento de erros centralizado.
 * Captura erros lançados na aplicação, incluindo erros do Prisma,
 * e formata uma resposta de erro consistente.
 * Adicione tratamentos conforme necessário
 */
const { Prisma } = require('@prisma/client');

const errorHandler = (error, req, res, next) => {
  console.error(error.stack);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        message: `O campo '${error.meta.target.join(', ')}' já existe.`,
        errorCode: 'CONFLICT',
      });
    }
  }
  return res.status(500).json({
    message: 'Ocorreu um erro inesperado no servidor.',
    errorCode: 'INTERNAL_SERVER_ERROR',
  });
};

module.exports = errorHandler;