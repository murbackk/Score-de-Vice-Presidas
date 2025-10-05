const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar projetos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projetos ORDER BY data_inicio DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar projeto
router.post('/', async (req, res) => {
  const {
    nome, data_inicio, data_realizacao, objetivo,
    beneficiarios, area_enfoque, dificuldades_enfrentadas
  } = req.body;

  try {
    await pool.query(`
      INSERT INTO projetos 
      (nome, data_inicio, data_realizacao, objetivo, beneficiarios, area_enfoque, dificuldades_enfrentadas)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `, [nome, data_inicio, data_realizacao, objetivo, beneficiarios, area_enfoque, dificuldades_enfrentadas]);
    res.json({ message: 'Projeto registrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Excluir projeto
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM projetos WHERE id = $1', [req.params.id]);
    res.json({ message: 'Projeto excluído!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
