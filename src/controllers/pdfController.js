import AlunoModel from '../models/alunoModel.js';
import { gerarPdfAluno, gerarPdfTodos } from '../utils/pdfHelper.js';

export const informacoesTodos = async (req, res) => {
    try {
        const informacoes = await PetModel.buscarTodos(req.query);

        if (!informacoes || informacoes.length === 0) {
            return res.status(200).json({ message: 'Nenhuma informação encontrada.' });
        }

        const pdf = await gerarPdfTodos(informacoes);
        return res
            .set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="pets.pdf"',
            })
            .send(pdf);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao gerar as informações.' });
    }
};

export const informacoesPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const pet = await PetModel.buscarPorId(parseInt(id));

        if (!pet) {
            return res.status(404).json({ error: 'Registro de pet não encontrado.' });
        }

        const pdf = await gerarPdfPet(pet);
        return res
            .set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `inline; filename="pets_${id}.pdf"`,
            })
            .send(pdf);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao gerar informacoes.' });
    }
};
