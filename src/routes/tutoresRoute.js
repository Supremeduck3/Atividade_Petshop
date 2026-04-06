import express from 'express';
import * as controller from '../controllers/tutorController.js';
import autenticar1 from '../utils/apiKey.js';
const router = express.Router();

router.post('/tutores', autenticar1, controller.criar);
router.get('/tutores', autenticar1, controller.buscarTodos);
router.get('/tutores/:id', autenticar1, controller.buscarPorId);
router.put('/tutores/:id', autenticar1, controller.atualizar);
router.delete('/tutores/:id', autenticar1, controller.deletar);

export default router;
