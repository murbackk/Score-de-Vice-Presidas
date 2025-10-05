const express = require('express');
const router = express.Router();
const pool = require('../db');

// Listar pontuações
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, m.descricao AS meta, v.nome AS vp_nome, i.nome AS ip_nome
      FROM pontuacoes p
      LEFT JOIN metas m ON m.id = p.meta_id
      LEFT JOIN vps v ON v.id = p.vp_id
      LEFT JOIN ips i ON i.id = p.ip_id
      ORDER BY p.data_registro DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adicionar pontuação
router.post('/', async (req, res) => {
  const { vp_id, ip_id, meta_id, pontuacao } = req.body;
  try {
    await pool.query(
      'INSERT INTO pontuacoes (vp_id, ip_id, meta_id, pontuacao) VALUES ($1, $2, $3, $4)',
      [vp_id || null, ip_id || null, meta_id, pontuacao]
    );
    res.json({ message: 'Pontuação registrada com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remover pontuação
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM pontuacoes WHERE id = $1', [req.params.id]);
    res.json({ message: 'Pontuação removida!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
