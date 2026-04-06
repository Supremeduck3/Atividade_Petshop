import express from 'express';
import { upload } from '../utils/fotoHelper.js';
import * as controller from '../controllers/fotoController.js';
import autenticar1 from './../utils/apiKey.js';

const router = express.Router();

router.post('/catalogo/:id/foto', autenticar1 ,upload.single('foto'), controller.uploadFoto);

router.get('/catalogo/:id/foto', autenticar1, controller.verFoto);

export default router;
