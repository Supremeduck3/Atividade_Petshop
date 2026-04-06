import express from 'express';
import * as controller from '../controllers/tutorController.js';
import autenticar1 from "./../utils/apiKey.js"
const router = express.Router();

router.post('/tutores',autenticar1, controller.criar);
router.get('/tutores',autenticar1, controller.buscarTodos);
router.get('/tutores/:id',autenticar1, controller.buscarPorId);
router.put('/tutores/:id',autenticar1, controller.atualizar);
router.delete('/tutores/:id',autenticar1, controller.deletar);

router.post('/fotos', controller1.criar);
router.get('/fotos', controller1.buscarTodos);
router.get('/fotos/:id', controller1.buscarPorId);
router.put('/fotos/:id', controller1.atualizar);
router.delete('/fotos/:id', controller1.deletar);



export default router;
