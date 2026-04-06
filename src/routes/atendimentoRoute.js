import express from 'express';
import * as controller from '../controllers/atendimentoController.js';
import autenticar1 from '../utils/apiKey.js';
const router = express.Router();

router.post('/atendimento', autenticar1, controller.criar);
router.get('/atendimento', autenticar1, controller.buscarTodos);
router.get('/atendimento/:id', autenticar1, controller.buscarPorId);
router.put('/atendimento/:id', autenticar1, controller.atualizar);
router.delete('/atendimento/:id', autenticar1, controller.deletar);

export default router;
