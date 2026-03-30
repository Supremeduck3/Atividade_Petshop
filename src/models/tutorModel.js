import prisma from '../utils/prismaClient.js';

export default class tutorModel {
    constructor({
        id = null,
        nome = null,
        email = null,
        telefone = null,
        cep = null,
        logradouro = null,
        bairro = null,
        localidade = null,
        uf = null,
        ativo = true,
    } = {}) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cep = cep;
        this.logradouro = logradouro;
        this.bairro = bairro;
        this.localidade = localidade;
        this.uf = uf;
        this.ativo = ativo;
    }

    async criar() {
        return prisma.tutor.create({
            data: {
                nome: this.nome,
                email: this.email,
                telefone: this.telefone,
                cep: this.cep,
                logradouro: this.logradouro,
                bairro: this.bairro,
                localidade: this.localidade,
                uf: this.uf,
            },
        });
    }

    async atualizar() {
        return prisma.tutor.update({
            where: { id: this.id },
            data: {
                nome: this.nome,
                email: this.email,
                telefone: this.telefone,
                cep: this.cep,
                logradouro: this.logradouro,
                bairro: this.bairro,
                localidade: this.localidade,
                uf: this.uf,
            },
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
        if (filtros.email !== undefined) {
            where.email = filtros.email === 'true';
        }
        if (filtros.telefone !== undefined) {
            where.telefone = parseFloat(filtros.telefone);
        }
        if (filtros.cep !== undefined) {
            where.cep = parseFloat(filtros.cep);
        }
        if (filtros.logradouro !== undefined) {
            where.logradouro = parseFloat(filtros.logradouro);
        }
        if (filtros.bairro !== undefined) {
            where.bairro = parseFloat(filtros.bairro);
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
