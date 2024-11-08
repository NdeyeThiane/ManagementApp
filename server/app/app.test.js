const request = require('supertest');
const { app, pool } = require('./app');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
 
 

beforeAll(async () => {
  await pool.query(
    `INSERT INTO users (username, email, password, role) VALUES 
    ('testuser', 'testuser@example.com', '${await bcrypt.hash('securepassword', 10)}', 'user') 
    ON CONFLICT (email) DO NOTHING`
  );
  await pool.query(
    `INSERT INTO invitations (email, token, expires_at, used) VALUES 
    ('testuser@example.com', 'valid-token', NOW() + INTERVAL '1 day', FALSE) 
    ON CONFLICT (email) DO NOTHING`
  );
});

afterAll(async () => {
  await pool.query('DELETE FROM users WHERE email = $1', ['testuser@example.com']);
  await pool.query('DELETE FROM invitations WHERE email = $1', ['testuser@example.com']);
  await pool.query('DELETE FROM invitations WHERE email = $1', ['newuser@example.com']);
  await pool.end();
});

describe('Users API', () => {
  describe('POST /register', () => {
    it('should register a new user with a valid invitation token', async () => {
      const res = await request(app).post('/register').send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'securepassword',
        role: 'user', 
        token: 'valid-token'
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });

    it('should not register a user with an invalid or expired invitation token', async () => {
      const res = await request(app).post('/register').send({
        username: 'invaliduser',
        email: 'invaliduser@example.com',
        password: 'securepassword',
        token: 'invalid-token'
      });
      expect(res.statusCode).toEqual(400);
      expect(res.text).toContain('Invalid or expired invitation token.');
    });
  });

  describe('POST /login', () => {
    it('should log in a user with valid credentials', async () => {
      const res = await request(app).post('/login').send({
        email: 'testuser@example.com',
        password: 'securepassword'
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should not log in a user with invalid credentials', async () => {
      const res = await request(app).post('/login').send({
        email: 'testuser@example.com',
        password: 'wrongpassword'
      });
      expect(res.statusCode).toEqual(400);
      expect(res.text).toContain('Invalid Credentials');
    });
  });

  describe('POST /reset-password', () => {
    it('should send a password reset link for an existing user', async () => {
      const res = await request(app).post('/reset-password').send({
        email: 'testuser@example.com'
      });
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('Password reset email sent!');
    });

    it('should return 404 for non-existent email', async () => {
      const res = await request(app).post('/reset-password').send({
        email: 'nonexistent@example.com'
      });
      expect(res.statusCode).toEqual(404);
      expect(res.text).toContain('User with this email does not exist.');
    });
  });

  describe('POST /reset-password/confirm', () => {
    it('should reset the password with a valid token', async () => {
      const token = jwt.sign({ user_id: 1, email: 'testuser@example.com' }, process.env.TOKEN_KEY, {
        expiresIn: '1h'
      });

      const res = await request(app).post('/reset-password/confirm').send({
        token,
        newPassword: 'newpassword'
      });
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('Password has been successfully reset');
    });

    it('should return 401 for an invalid or expired token', async () => {
      const res = await request(app).post('/reset-password/confirm').send({
        token: 'invalid-token',
        newPassword: 'newpassword'
      });
      expect(res.statusCode).toEqual(401);
      expect(res.text).toContain('Invalid or expired token');
    });
  });

  describe('POST /generate-invitation', () => {
    it('should generate an invitation for a new user', async () => {
      const res = await request(app).post('/generate-invitation').send({
        email: 'newuser@example.com'
      });
      expect(res.statusCode).toEqual(200);
      expect(res.text).toContain('Invitation sent!');
    });

    it('should return 409 if an invitation already exists for the email', async () => {
      const res = await request(app).post('/generate-invitation').send({
        email: 'testuser@example.com'
      });
      expect(res.statusCode).toEqual(409);
      expect(res.text).toContain('Invitation already sent to this email.');
    });
  });
});
