import express from 'express';
import 'dotenv/config';
import petshopRoutes from './routes/tutoresRoute.js';
import atendimentoRoutes from './routes/tutoresRoute.js';
import petshopRoutes from './routes/tutoresRoute.js';
import fotoRoutes from './routes/fotoRoute.js';
import pdfRoutes from './routes/pdfRoute.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('🚀 API funcionando');
});

// Rotas
app.use('/api', petshopRoutes);
app.use('/api', petshopRoutes);
app.use('/api', petshopRoutes);
app.use('/', fotoRoutes);
app.use('/', pdfRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
