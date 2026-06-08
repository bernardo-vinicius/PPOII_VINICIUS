/**
 * Ponto de entrada principal da aplicação de back-end.
 * Configura o servidor Express, aplica middlewares essenciais,
 * monta as rotas e inicia o servidor.
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error.middleware');

// Importar rotas
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/posts.routes'); //animalRoutes 

// Inicializa o Express
const app = express();

// Middlewares
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], })); // Habilita Cross-Origin Resource Sharing (permite requisições fora do dominio local)
app.use(express.json()); // Permite que o Express realize parse de JSON das requisições

// Rota de teste
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API online!' });
});

// Montar rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


// Middleware de tratamento de erros (deve ser o último a ser usado)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});