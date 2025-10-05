const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar todas as metas distritais
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM metas_distritais ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar status (checkbox)
router.put('/:id', async (req, res) => {
  const { cumprida } = req.body;
  try {
    await pool.query('UPDATE metas_distritais SET cumprida = $1 WHERE id = $2', [cumprida, req.params.id]);
    res.json({ message: 'Meta atualizada com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
