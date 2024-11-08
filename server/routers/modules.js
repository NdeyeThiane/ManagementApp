
const express = require('express');
const router = express.Router();
const pool = require('../db'); 


router.get('/courses/:courseId/modules', async (req, res) => {
  const { courseId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM modules WHERE courseid = $1', [courseId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/courses/:courseId/modules', async (req, res) => {
  const { courseId } = req.params;
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO modules (courseid, title, description) VALUES ($1, $2, $3) RETURNING *',
      [courseId, title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/modules/:moduleId', async (req, res) => {
  const { moduleId } = req.params;
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE modules SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, moduleId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/modules/:moduleId', async (req, res) => {
  const { moduleId } = req.params;
  try {
    const result = await pool.query('DELETE FROM modules WHERE id = $1 RETURNING *', [moduleId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
