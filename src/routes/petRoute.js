import express from 'express';
import * as controller from '../controllers/petController.js';
import autenticar1 from '../utils/apiKey.js';
const router = express.Router();

router.post('/pets', autenticar1, controller.criar);
router.get('/pets', autenticar1, controller.buscarTodos);
router.get('/pets/:id', autenticar1, controller.buscarPorId);
router.put('/pets/:id', autenticar1, controller.atualizar);
router.delete('/pets/:id', autenticar1, controller.deletar);

export default router;
