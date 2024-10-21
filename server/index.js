import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import 'dotenv/config'
import pkg from 'pg';
const { Pool } = pkg;



const app = express()
const port = 3000;

app.use(cors())
app.use(bodyParser.json())

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT
})

app.get('/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching users');
    }
  });


  app.get('/courses', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM courses');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).send('Error fetching courses');
    }
  });

app.get('/', (req, res) =>{
    res.send("HELLO");
})


app.listen(port, ()=> console.log(`server start at port: http://localhost:${port}`))