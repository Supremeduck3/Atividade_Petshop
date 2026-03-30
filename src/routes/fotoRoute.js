import express from 'express';
import { upload } from '../utils/fotoHelper.js';
import * as controller from '../controllers/fotoController.js';

const router = express.Router();

router.post('/catalogo/:id/foto', upload.single('foto'), controller.uploadFoto);

router.get('/catalogo/:id/foto', controller.verFoto);

export default router;
