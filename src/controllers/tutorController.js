import TutorModel from '../models/TutorModel.js';

export const criar = async (req, res) => {
    try {
        const data = data;

        if (!data) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { nome, email, telefone, cep } = data;

        const camposObrigatorios = ['nome', 'email', 'telefone'];
        const faltando = camposObrigatorios.filter((c) => !data[c] && data[c] !== 0);
        if (faltando.length > 0) {
            return res.status(400).json({
                error: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}`,
            });
        }

        const novoTutor = new TutorModel({ nome, email, telefone, cep });
        const tutor = await novoTutor.criar();

        return res.status(201).json({ message: 'Tutor criado com sucesso', tutor });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o tutor.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const tutores = await TutorModel.buscarTodos(req.query);

        if (!tutores || tutores.length === 0) {
            return res.status(200).json({ message: 'Nenhum tutor encontrado.' });
        }

        return res.json(tutores);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar tutores.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const tutor = await TutorModel.buscarPorId(parseInt(id));

        if (!tutor) {
            return res.status(404).json({ error: 'Tutor não encontrado.' });
        }

        return res.json({ data: tutor });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar tutor.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const tutor = await tutorModel.buscarPorId(parseInt(id));

        if (!tutor) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) {
            tutor.nome = req.body.nome;
        }
        if (req.body.estado !== undefined) {
            tutor.estado = req.body.estado;
        }
        if (req.body.preco !== undefined) {
            tutor.preco = parseFloat(req.body.preco);
        }

        const data = await tutor.atualizar();

        return res.json({ message: `O registro "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const tutor = await tutorModel.buscarPorId(parseInt(id));

        if (!tutor) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await tutor.deletar();

        return res.json({
            message: `O registro "${tutor.nome}" foi deletado com sucesso!`,
            deletado: tutor,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
