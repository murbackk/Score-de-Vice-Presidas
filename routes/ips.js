const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar IPs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT i.*, COALESCE(SUM(p.pontuacao), 0) AS total_pontos
      FROM ips i
      LEFT JOIN pontuacoes p ON i.id = p.ip_id
      GROUP BY i.id
      ORDER BY i.nome;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adicionar IP
router.post('/', async (req, res) => {
  const { nome, clube } = req.body;
  try {
    await pool.query('INSERT INTO ips (nome, clube) VALUES ($1, $2)', [nome, clube]);
    res.json({ message: 'Imagem Pública adicionada!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remover IP
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM ips WHERE id = $1', [req.params.id]);
    res.json({ message: 'Imagem Pública removida!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
