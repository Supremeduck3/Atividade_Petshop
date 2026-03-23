import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabela exemplo...');

    // Remove todos os registros
    //await prisma.exemplo.deleteMany();

    console.log('📦 Inserindo novos registros...');

    await prisma.tutor.createMany({
        data: [
            {
                nome: "joão",
                email: "joão@gmail.com",
                telefone: "19982387091"
           },
            {
                nome: "Victor",
                email: "victor@gmail.com",
                telefone: "19982301340"
           },
            {
                nome: "Livia",
                email: "livia@gmail.com",
                telefone: "19985487120"
           },
            {
                nome: "Rebecca",
                email: "rebecca@gmail.com",
                telefone: "19984532907"
           },
            {
                nome: "Beatriz",
                email: "beatriz@gmail.com",
                telefone: "19987387651"
           }
        ],
    });


    await prisma.Pet.createMany({
        data: [
            { "nome": "Luna", "categoria": "Gato", "preco": 180.0 },
            { "nome": "Pipoca", "categoria": "Passaro", "preco": 90.0 },
            { "nome": "Bidu", "categoria": "Cachorro", "preco": 300.0 },
            { "nome": "Mimi", "categoria": "Gato", "preco": 160.0 },
            { "nome": "Chico", "categoria": "Roedor", "preco": 70.0 }
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
