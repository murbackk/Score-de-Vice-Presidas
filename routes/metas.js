const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar metas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM metas ORDER BY descricao');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Criar meta
router.post('/', async (req, res) => {
  const { descricao, peso } = req.body;
  try {
    await pool.query('INSERT INTO metas (descricao, peso) VALUES ($1, $2)', [descricao, peso]);
    res.json({ message: 'Meta adicionada com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remover meta
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM metas WHERE id = $1', [req.params.id]);
    res.json({ message: 'Meta removida!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
