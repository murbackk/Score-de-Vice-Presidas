const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar VPs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.*, COALESCE(SUM(p.pontuacao), 0) AS total_pontos
      FROM vps v
      LEFT JOIN pontuacoes p ON v.id = p.vp_id
      GROUP BY v.id
      ORDER BY v.nome;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adicionar VP
router.post('/', async (req, res) => {
  const { nome, posicao } = req.body;
  try {
    await pool.query('INSERT INTO vps (nome, posicao) VALUES ($1, $2)', [nome, posicao]);
    res.json({ message: 'Vice-Presidente adicionado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remover VP
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM vps WHERE id = $1', [req.params.id]);
    res.json({ message: 'Vice-Presidente removido!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
