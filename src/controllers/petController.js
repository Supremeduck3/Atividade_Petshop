import PetModel from '../models/PetModel.js';

export const criar = async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { nome, descricao, categoria, disponivel, preco, foto } = data;

        const camposObrigatorios = ['nome', 'descricao', 'categoria', 'disponivel', 'preco', 'foto'];
        const faltando = camposObrigatorios.filter((c) => !data[c] && data[c] !== 0);
        if (faltando.length > 0) {
            return res.status(400).json({
                error: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}`,
            });
        }

        const novoPet = new PetModel({ nome, descricao, categoria, disponivel, preco, foto });
        const pet = await novoPet.criar();

        return res.status(201).json({ message: 'Pet criado com sucesso', pet });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o pet.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const pets = await PetModel.buscarTodos(req.query);

        if (!pets || pets.length === 0) {
            return res.status(200).json({ message: 'Nenhum pet encontrado.' });
        }

        return res.json(pets);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar pets.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const pet = await PetModel.buscarPorId(parseInt(id));

        if (!pet) {
            return res.status(404).json({ error: 'Pet não encontrado.' });
        }

        return res.json({ data: pet });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar pet.' });
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

        const pet = await PetModel.buscarPorId(parseInt(id));

        if (!pet) {
            return res.status(404).json({ error: 'Pet não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) {
            pet.nome = req.body.nome;
        }
        if (req.body.descricao !== undefined) {
            pet.descricao = req.body.descricao;
        }
        if (req.body.categoria !== undefined) {
            pet.categoria = req.body.categoria;
        }
        if (req.body.disponivel !== undefined) {
            pet.disponivel = req.body.disponivel;
        }
        if (req.body.preco !== undefined) {
            pet.preco = parseFloat(req.body.preco);
        }
        if (req.body.foto !== undefined) {
            pet.foto = req.body.foto;
        }

        const data = await pet.atualizar();

        return res.json({ message: `O pet "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar pet.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const pet = await PetModel.buscarPorId(parseInt(id));

        if (!pet) {
            return res.status(404).json({ error: 'Pet não encontrado para deletar.' });
        }

        await pet.deletar();

        return res.json({
            message: `O pet "${pet.nome}" foi deletado com sucesso!`,
            deletado: pet,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar pet.' });
    }
};
