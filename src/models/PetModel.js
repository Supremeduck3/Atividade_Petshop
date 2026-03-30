import prisma from '../utils/prismaClient.js';

export default class PetModel {
    constructor({
        id = null,
        nome = null,
        descricao = null,
        categoria = null,
        disponivel = true,
        preco = null,
        foto = null,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.categoria = categoria;
        this.disponivel = disponivel;
        this.preco = preco;
        this.foto = foto;
    }

    validar() {
        if (!this.nome) {
            throw new Error('Nome é obrigatório.');
        }

        if (!this.categoria) {
            throw new Error('Categoria inválida.');
        }

        const categoriasValidas = ['Cachorro', 'Passaro', 'Gato', 'Roedor'];

        if (!categoriasValidas.includes(this.categoria)) {
            throw new Error('Categoria inválida.');
        }

        if (this.preco === null || this.preco < 0) {
            throw new Error('Preço deve ser maior ou igual a 0.');
        }
    }

    async criar() {
        this.validar();

        return prisma.pet.create({
            data: {
                nome: this.nome,
                descricao: this.descricao,
                categoria: this.categoria,
                disponivel: this.disponivel,
                preco: this.preco,
                foto: this.foto,
            },
        });
    }

    async atualizar() {
        const existente = await prisma.pet.findUnique({
            where: { id: this.id },
        });

        if (!existente) {
            throw new Error('Registro não encontrado.');
        }

        this.validar();

        return prisma.pet.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                descricao: this.descricao,
                categoria: this.categoria,
                disponivel: this.disponivel,
                preco: this.preco,
                foto: this.foto,
            },
        });
    }

    async deletar() {
        const existente = await prisma.pet.findUnique({
            where: { id: this.id },
        });

        if (!existente) {
            throw new Error('Registro não encontrado.');
        }

        return prisma.pet.delete({
            where: { id: this.id },
        });
    }

    // REGRA DE NEGÓCIO IMPORTANTE
    static async verificarDisponibilidade(id) {
        const pet = await prisma.pet.findUnique({ where: { id } });

        if (!pet) {
            throw new Error('Registro não encontrado.');
        }

        if (!pet.disponivel) {
            throw new Error('Não é permitido utilizar item indisponível.');
        }

        return pet;
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        if (filtros.categoria) {
            where.categoria = filtros.categoria;
        }

        if (filtros.disponivel !== undefined) {
            where.disponivel = filtros.disponivel === 'true';
        }

        if (filtros.preco !== undefined) {
            where.preco = parseFloat(filtros.preco);
        }

        return prisma.pet.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.pet.findUnique({
            where: { id },
        });

        if (!data) return null;

        return new PetModel(data);
    }
}
