import AtendimentoModel from '../models/AtendimentoModel.js';

export const criar = async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { tutorId, petId } = data;

        const camposObrigatorios = ['tutorId', 'petId'];
        const faltando = camposObrigatorios.filter((c) => !data[c] && data[c] !== 0);
        if (faltando.length > 0) {
            return res.status(400).json({
                error: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}`,
            });
        }

        const novoAtendimento = new AtendimentoModel({ tutorId, petId });
        const atendimento = await novoAtendimento.criar();

        return res.status(201).json({ message: 'Atendimento criado com sucesso', atendimento });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o atendimento.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const atendimentos = await AtendimentoModel.buscarTodos(req.query);

        if (!atendimentos || atendimentos.length === 0) {
            return res.status(200).json({ message: 'Nenhum atendimento encontrado.' });
        }

        return res.json(atendimentos);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar atendimentos.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const atendimento = await AtendimentoModel.buscarPorId(parseInt(id));

        if (!atendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado.' });
        }

        return res.json({ data: atendimento });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar atendimento.' });
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

        const atendimento = await AtendimentoModel.buscarPorId(parseInt(id));

        if (!atendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado para atualizar.' });
        }

        if (req.body.tutorId !== undefined) {
            atendimento.tutorId = parseFloat(req.body.tutorId);
        }
        if (req.body.petId !== undefined) {
            atendimento.petId = parseFloat(req.body.petId);
        }

        const data = await atendimento.atualizar();

        return res.json({ message: `O atendimento "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar atendimento.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const atendimento = await AtendimentoModel.buscarPorId(parseInt(id));

        if (!atendimento) {
            return res.status(404).json({ error: 'Atendimento não encontrado para deletar.' });
        }

        await atendimento.deletar();

        return res.json({
            message: `O atendimento "${atendimento.nome}" foi deletado com sucesso!`,
            deletado: atendimento,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar atendimento.' });
    }
};
