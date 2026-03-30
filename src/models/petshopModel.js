import prisma from '../utils/prismaClient.js';

export default class tutorModel {
    constructor({ id = null, nome = null,email = null, telefone = null, cep = null, logradouro = null, bairro = null,   } = {}) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone
    }

    async criar() {
        return prisma.tutor.create({
            data: {
                nome: this.nome,
                estado: this.estado,
                preco: this.preco,
            },
        });
    }

    async atualizar() {
        return prisma.tutor.update({
            where: { id: this.id },
            data: { nome: this.nome, estado: this.estado, preco: this.preco },
        });
    }

    async deletar() {
        return prisma.tutor.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.estado !== undefined) {
            where.estado = filtros.estado === 'true';
        }
        if (filtros.preco !== undefined) {
            where.preco = parseFloat(filtros.preco);
        }

        return prisma.tutor.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.tutor.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new tutorModel(data);
    }
}
