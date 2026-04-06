import express from 'express';
import * as controller from '../controllers/pdfController.js';

const router = express.Router();

router.get('/pdf', controller.buscarTodos);
router.get('/:id/pdf', controller.informacoesPorId);

export default router;
