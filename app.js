const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    const users = await prisma.usuario.findMany();
    res.json(users);
});

app.post('/usuario', async (req, res) => {
    console.log(req.body);
    const { nome, email, senha, telefone, endereco, jus } = req.body;

    const newUser = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha,
            telefone,
            endereco,
            jus,
        },
    });
    res.json(newUser);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});