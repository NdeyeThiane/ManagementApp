
const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/api/courses/:courseId/enrollments', async (req, res) => {
  const { courseId } = req.params;
  try {
    const result = await pool.query(`
      SELECT users.id, users.username, users.email 
      FROM enrollments 
      JOIN users ON enrollments.userid = users.id 
      WHERE enrollments.courseid = $1`, [courseId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/api/courses/:courseId/enrollments', async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO enrollments (userid, courseid, enrollmentdate) VALUES ($1, $2, NOW()) RETURNING *',
      [userId, courseId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete('/api/courses/:courseId/enrollments/:userId', async (req, res) => {
  const { courseId, userId } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM enrollments WHERE userid = $1 AND courseid = $2 RETURNING *',
      [userId, courseId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
