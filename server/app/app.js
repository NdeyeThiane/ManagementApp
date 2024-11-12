const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const pool = require('../db')
const crypto = require('crypto');
const modulesRouter = require('../routers/modules');
const assignmentsRouter = require('../routers/assignments');
const enrollmentsRouter = require('../routers/enrollments');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', modulesRouter);
app.use('/api', assignmentsRouter);
app.use('/api', enrollmentsRouter);


  // {
//   user: process.env.USER,
//   host: process.env.HOST,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   port: process.env.PORT
// });


// User Registration
app.post('/api/register', async (req, res) => {
    const { username, email, password, token } = req.body;
    try {
      const invitation = await pool.query(
        'SELECT * FROM invitations WHERE token = $1 AND expires_at > NOW() AND used = FALSE',
        [token]
      );
  
      if (invitation.rows.length === 0) {
        return res.status(400).send('Invalid or expired invitation token.');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const role = invitation.rows[0].role; 
      const newUser = await pool.query(
        'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, email, hashedPassword, role]
      );
  
      await pool.query('UPDATE invitations SET used = TRUE WHERE token = $1', [token]);
      res.status(201).json(newUser.rows[0]);
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  });
  

// User Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }

        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length > 0 && await bcrypt.compare(password, user.rows[0].password)) {
            const token = jwt.sign(
                { user_id: user.rows[0].userid, email },
                process.env.TOKEN_KEY,
                { expiresIn: "2h" }
            );
            user.rows[0].token = token;
            res.status(200).json(user.rows[0]);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.error("Error in POST /login:", err);
        res.status(500).send("Something went wrong");
    }
});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});


app.post('/api/reset-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).send("User with this email does not exist.");
        }

        const token = jwt.sign(
            { user_id: user.rows[0].userid, email },
            process.env.TOKEN_KEY,
            { expiresIn: '1h' }
        );

        const link = `${process.env.FRONTEND_URL}?token=${token}`;
        let mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset Link',
            html: `<p>Click <a href="${link}">here</a> to reset your password</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).send('Error sending email');
            } else {
                res.status(200).send('Password reset email sent!');
            }
        });
    } catch (error) {
        console.error("Error in POST /reset-password:", error);
        res.status(500).send("Something went wrong");
    }
});


app.post('/api/reset-password/confirm', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query(
            'UPDATE users SET password = $1 WHERE userid = $2',
            [hashedPassword, decoded.user_id]
        );

        res.send("Password has been successfully reset");
    } catch (error) {
        console.error("Error in POST /reset-password/confirm:", error);
        res.status(401).send("Invalid or expired token");
    }
});


app.post('/api/generate-invitation', async (req, res) => {
    const { email, role } = req.body;
    try {
      const token = crypto.randomBytes(20).toString('hex');
      const expires_at = new Date();
      expires_at.setHours(expires_at.getHours() + 48); 
  
      await pool.query(
        'INSERT INTO invitations (email, token, expires_at, role) VALUES ($1, $2, $3, $4)',
        [email, token, expires_at, role]
      );
  
      const link = `${process.env.FRONTEND_URL}/register?token=${token}`;
      let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'You are invited to register',
        html: `<p>Welcome the cohort please click <a href="${link}">here</a> to register.</p>`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send('Error sending email');
        } else {
          res.status(200).send('Invitation sent!');
        }
      });
    } catch (error) {
      res.status(500).send('Something went wrong');
    }
  });
  

  app.get('/api/users', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT userid, username, email, role, createdat FROM users');
      res.json(rows);
    } catch (error) {
      console.error("Error in GET /api/users:", error);
      res.status(500).json({ error: error.message });
    }
  });


  app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
  
    try {
      if (!username && !email && !role) {
        return res.status(400).json({ message: 'Please provide fields to update.' });
      }
  
      const updates = [];
      const values = [];
  
      if (username) {
        updates.push('username = $' + (values.length + 1));
        values.push(username);
      }
      if (email) {
        updates.push('email = $' + (values.length + 1));
        values.push(email);
      }
      if (role) {
        updates.push('role = $' + (values.length + 1));
        values.push(role);
      }

      values.push(id);
  
      const query = `UPDATE users SET ${updates.join(', ')} WHERE userid = $${values.length} RETURNING *`;
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User updated successfully', user: result.rows[0] });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


app.get('/api/courses', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM courses');
        res.json(rows);
    } catch (error) {
        console.error("Error in GET /courses:", error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/courses', async (req, res) => {
    const { coursename, description } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO courses (coursename, description) VALUES ($1, $2) RETURNING *',
            [coursename, description]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error("Error in POST /courses:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/courses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM courses WHERE courseid = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error("Error in GET /courses/:id:", error);
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/courses/:id', async (req, res) => {
    const { id } = req.params;
    const { coursename, description } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE courses SET coursename = $1, description = $2 WHERE courseid = $3 RETURNING *',
            [coursename, description, id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error in PUT /courses/:id:", error);
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/courses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await pool.query('DELETE FROM courses WHERE courseid = $1', [id]);
        if (rowCount === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error("Error in DELETE /courses/:id:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = { app, pool, transporter };

    