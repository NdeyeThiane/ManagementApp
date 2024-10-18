import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import 'dotenv/config'


const app = express()
const port = 3000;

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) =>{
    res.send("HELLO");
})


app.listen(port, ()=> console.log(`server start at port: http://localhost:${port}`))