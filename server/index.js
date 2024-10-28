import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import 'dotenv/config'
import { auth } from 'express-openid-connect';
import pkg from 'pg';
const { Pool } = pkg;



const app = express()
const port = 3000;

app.use(cors())
app.use(bodyParser.json())

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   secret: process.env.CLIENT_SECRET,
//   baseURL: process.env.BASEURL,
//   clientID: process.env.CLIENT_ID,
//   issuerBaseURL: process.env.ISSUERBASEURL,
// };

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT
})

// // auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// // req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

app.get('/users', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM users');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching users');
    }
  });


  app.get('/api/courses', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM courses');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).send('Error fetching courses');
    }
  });

  app.post('/api/user', async (req, res) => {
    const newUser = {
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      email: req.body.email,
      role: req.body.role
    }
    console.log(newUser);
    const queryEmail = 'SELECT * FROM users WHERE email=$1 LIMIT 1';
    const valuesEmail = [newUser.email]
    const resultsEmail = await pool.query(queryEmail, valuesEmail);
    if(resultsEmail.rows[0]){
      console.log(`Thank you ${resultsEmail.rows[0].first_name} for comming back`)
    } else{
    const query = 'INSERT INTO users(last_name, first_name, email, role) VALUES($1, $2, $3, $4) RETURNING *'
    const values = [newUser.last_name, newUser.first_name, newUser.email, newUser.role]
    const result = await pool.query(query, values);
    res.send((result.rows[0]));
    console.log(result.rows[0]);
  
    }
  }
)

app.get('/api/courses/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const item = await pool.query('SELECT * FROM courses WHERE id=$1', [id]);
    res.status(200).json(item.rows);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Error fetching courses');
  }
});

app.post('/api/course', async(req, res)=>{
  const course = {title: req.body.title,
     description: req.body.description, 
     instructor_id:req.body.instructor_id,
     created_at: req.body.created_at } 
  const add = await pool.query("INSERT INTO courses(title, description, instructor_id, created_at) VALUES($1, $2, $3, $4) RETURNING *", [course.title, course.description, course.instructor_id, course.created_at]);
  res.send(add.rows[0]);
  console.log(res.send[0]);
})

app.delete('/api/courses/:id', async(req, res) => {
  try{
  const {id} = req.params;
  console.log(id);
  const deleteCourse = await pool.query('DELETE FROM courses WHERE id=$1', [id])
  res.status(200).json(deleteCourse);
  } catch (error) {
    console.error('Error deleting:', error);
    res.status(500).send('Error deleting courses');
  }
  
})



app.post('/api/units', async(req, res) =>{
  const unit = {
    module_id: req.body.module_id,
    title: req.body.title,
    contents: req.body.contents, 
    Image:req.body.image};
    const add = await pool.query("INSERT INTO units(module_id, title,contents,image) VALUES($1, $2, $3, $4) RETURNING *", [unit.module_id, unit.title, unit.contents, unit.Image]);
  res.send(add.rows[0]);
  console.log(res.send[0]);

})








































app.get('/', (req, res) =>{
    res.send("HELLO");
})


app.listen(port, ()=> console.log(`server start at port: http://localhost:${port}`))



  

