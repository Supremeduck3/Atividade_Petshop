
import { processarFoto, removerFoto } from '../utils/fotoHelper.js';

export const uploadFoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
        }

        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const catalogo = await CatalogoModel.buscarPorId(parseInt(id));

        if (!catalogo) {
            removerFoto(req.file.path);
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        if (!catalogo.disponivel) {
            removerFoto(req.file.path);
            return res.status(400).json({ error: 'Item indisponível.' });
        }

        if (catalogo.foto) {
            removerFoto(catalogo.foto);
        }

        const caminhoFoto = await processarFoto(req.file.path);

        catalogo.foto = caminhoFoto;

        await catalogo.atualizar();

        return res.status(201).json({
            message: 'Foto salva com sucesso.',
            data: catalogo,
        });
    } catch (error) {
        console.error('Erro ao enviar foto:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const verFoto = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const catalogo = await CatalogoModel.buscarPorId(parseInt(id));

        if (!catalogo) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        if (!catalogo.foto) {
            return res.status(404).json({ error: 'Foto não encontrada.' });
        }

        return res.sendFile(catalogo.foto, { root: '.' });
    } catch (error) {
        console.error('Erro ao buscar foto:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
