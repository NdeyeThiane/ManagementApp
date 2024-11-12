
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/api/modules/:moduleId/assignments', async (req, res) => {
  const { moduleId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM assignments WHERE moduleid = $1', [moduleId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/api/modules/:moduleId/assignments', async (req, res) => {
  const { moduleId } = req.params;
  const { title, description, dueDate } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO assignments (moduleid, title, description, duedate) VALUES ($1, $2, $3, $4) RETURNING *',
      [moduleId, title, description, dueDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/api/assignments/:assignmentId', async (req, res) => {
  const { assignmentId } = req.params;
  const { title, description, dueDate } = req.body;
  try {
    const result = await pool.query(
      'UPDATE assignments SET title = $1, description = $2, duedate = $3 WHERE id = $4 RETURNING *',
      [title, description, dueDate, assignmentId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/api/assignments/:assignmentId', async (req, res) => {
  const { assignmentId } = req.params;
  try {
    const result = await pool.query('DELETE FROM assignments WHERE id = $1 RETURNING *', [assignmentId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
