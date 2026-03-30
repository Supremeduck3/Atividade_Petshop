import prisma from '../utils/prismaClient.js';

export default class AtendimentoModel {
    constructor({ id = null, tutorId = null, petId = null } = {}) {
        this.id = id;
        this.tutorId = tutorId;
        this.petId = petId;
    }

    async validar() {
        const tutor = await prisma.tutor.findUnique({
            where: { Id: this.tutorId },
        });

        if (!tutor) {
            throw new Error('Registro não encontrado.');
        }

        if (!tutor.ativo) {
            throw new Error('Operação não permitida para registro inativo.');
        }

        const pet = await prisma.pet.findUnique({
            where: { id: this.petId },
        });

        if (!pet) {
            throw new Error('Registro não encontrado.');
        }

        if (!pet.disponivel) {
            throw new Error('Não é permitido utilizar item indisponível.');
        }
    }

    async criar() {
        await this.validar();

        return prisma.atendimento.create({
            data: {
                tutorId: this.tutorId,
                petId: this.petId,
            },
        });
    }

    async atualizar() {
        const existente = await prisma.atendimento.findUnique({
            where: { id: this.id },
        });

        if (!existente) {
            throw new Error('Registro não encontrado.');
        }

        await this.validar();

        return prisma.atendimento.update({
            where: { id: this.id },
            data: {
                tutorId: this.tutorId,
                petId: this.petId,
            },
        });
    }

    async deletar() {
        const existente = await prisma.atendimento.findUnique({
            where: { id: this.id },
        });

        if (!existente) {
            throw new Error('Registro não encontrado.');
        }

        return prisma.atendimento.delete({
            where: { id: this.id },
        });
    }

    static async buscarTodos() {
        return prisma.atendimento.findMany({
            include: {
                tutor: true,
                pet: true,
            },
        });
    }

    static async buscarPorId(id) {
        const data = await prisma.atendimento.findUnique({
            where: { id },
            include: {
                tutor: true,
                pet: true,
            },
        });

        if (!data) return null;

        return new AtendimentoModel(data);
    }
}
