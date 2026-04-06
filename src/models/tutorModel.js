import prisma from '../utils/prismaClient.js';
import axios from 'axios';

export default class TutorModel {
    constructor({
        Id = null,
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
        this.Id = Id;
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

    async validar() {
        if (!this.nome || this.nome.length < 3 || this.nome.length > 100) {
            return { erro: 'Nome deve ter entre 3 e 100 caracteres.' };
        }

        if (!this.email) {
            return { erro: 'Email é obrigatório.' };
        }

        if (!this.telefone) {
            return { erro: 'Telefone é obrigatório.' };
        }

        // CEP + ViaCEP
        if (this.cep) {
            if (!/^\d{8}$/.test(this.cep)) {
                return { erro: 'CEP inválido.' };
            }

            try {
                const response = await axios.get(`https://viacep.com.br/ws/${this.cep}/json/`);

                if (response.data.erro) {
                    return { erro: 'CEP não encontrado.' };
                }

                this.logradouro = response.data.logradouro;
                this.bairro = response.data.bairro;
                this.localidade = response.data.localidade;
                this.uf = response.data.uf;

            } catch (error) {
                return { erro: 'Serviço externo indisponível.' };
            }
        }

        return null;
    }

    async criar() {
        const erro = await this.validar();
        if (erro) return erro;

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
                ativo: this.ativo,
            },
        });
    }

    async atualizar() {
        const existente = await prisma.tutor.findUnique({
            where: { Id: this.Id },
        });

        if (!existente) {
            return { erro: 'Registro não encontrado.' };
        }

        if (!existente.ativo) {
            return { erro: 'Operação não permitida para registro inativo.' };
        }

        const erro = await this.validar();
        if (erro) return erro;

        return prisma.tutor.update({
            where: { Id: this.Id },
            data: {
                nome: this.nome,
                email: this.email,
                telefone: this.telefone,
                cep: this.cep,
            },
        });
    }

    async deletar() {
        const existente = await prisma.tutor.findUnique({
            where: { Id: this.Id },
        });

        if (!existente) {
            return { erro: 'Registro não encontrado.' };
        }

        if (!existente.ativo) {
            return { erro: 'Operação não permitida para registro inativo.' };
        }

        return prisma.tutor.delete({
            where: { Id: this.Id },
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }

        if (filtros.email) {
            where.email = { contains: filtros.email, mode: 'insensitive' };
        }

        if (filtros.localidade) {
            where.localidade = { contains: filtros.localidade, mode: 'insensitive' };
        }

        return prisma.tutor.findMany({ where });
    }

    static async buscarPorId(Id) {
        const data = await prisma.tutor.findUnique({
            where: { Id },
        });

        if (!data) return null;

        return new TutorModel(data);
    }
}
