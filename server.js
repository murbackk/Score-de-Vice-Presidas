const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Importar rotas
app.use('/vps', require('./routes/vps'));
app.use('/metas', require('./routes/metas'));
app.use('/ips', require('./routes/ips'));
app.use('/pontuacoes', require('./routes/pontuacoes'));
app.use('/projetos', require('./routes/projetos'));
app.use('/metas_distritais', require('./routes/metasDistritais'));


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
