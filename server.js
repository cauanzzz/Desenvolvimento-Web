const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
