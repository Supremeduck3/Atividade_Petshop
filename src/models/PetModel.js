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

    async criar() {
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
        return prisma.pet.delete({
            where: { id: this.id },
        });
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
