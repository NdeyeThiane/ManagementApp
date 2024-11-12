const express = require('express');
const pool = require('../db'); 
const modulesRouter = express.Router();

// Get all modules for a specific course
modulesRouter.get('/api/courses/:courseid/modules', async (req, res) => {
    const { courseid } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM modules WHERE courseid = $1', [courseid]);
        res.json(rows);
    } catch (error) {
        console.error("Error in GET /courses/:courseid/modules:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get details of a specific module
modulesRouter.get('/api/modules/:moduleid', async (req, res) => {
    const { moduleid } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM modules WHERE moduleid = $1', [moduleid]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Module not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error in GET /modules/:moduleid:", error);
        res.status(500).json({ error: error.message });
    }
});

// Add a module to a specific course
modulesRouter.post('/api/courses/:courseid/modules', async (req, res) => {
    const { courseid } = req.params;
    const { modulename } = req.body;

    if (!modulename) {
        return res.status(400).json({ error: "modulename is required" });
    }

    try {
        const courseCheck = await pool.query('SELECT * FROM courses WHERE courseid = $1', [courseid]);
        if (courseCheck.rows.length === 0) {
            return res.status(404).json({ error: "Course not found" });
        }

        const { rows } = await pool.query(
            'INSERT INTO modules (courseid, modulename) VALUES ($1, $2) RETURNING *',
            [courseid, modulename]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Error in POST /courses/:courseid/modules:", error);
        res.status(500).json({ error: error.message });
    }
});


// Update a module
modulesRouter.put('/api/modules/:moduleid', async (req, res) => {
    const { moduleid } = req.params;
    const { modulename } = req.body;

    if (!modulename) {
        return res.status(400).json({ error: "modulename is required" });
    }

    try {
        const { rows } = await pool.query(
            'UPDATE modules SET modulename = $1 WHERE moduleid = $2 RETURNING *',
            [modulename, moduleid]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Module not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error in PUT /modules/:moduleid:", error);
        res.status(500).json({ error: error.message });
    }
});

// Delete a module
modulesRouter.delete('/api/modules/:moduleid', async (req, res) => {
    const { moduleid } = req.params;
    try {
        const { rowCount } = await pool.query('DELETE FROM modules WHERE moduleid = $1', [moduleid]);
        if (rowCount === 0) {
            return res.status(404).json({ message: 'Module not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error in DELETE /modules/:moduleid:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = modulesRouter;
