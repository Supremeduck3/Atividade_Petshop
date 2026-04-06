import express from 'express';
import * as controller from '../controllers/pdfController.js';
import autenticar1 from './../utils/apiKey.js';

const router = express.Router();

router.get('/pdf', autenticar1 ,controller.buscarTodos);
router.get('/:id/pdf', autenticar1, controller.informacoesPorId);


export default router;
