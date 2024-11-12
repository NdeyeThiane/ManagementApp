const { text } = require('body-parser');
const { query } = require('express');
const { Pool } = require('pg');
const { param } = require('./routers/modules');


const pool = new Pool();


module.exports= {
    query: (text, params) => pool.query(text, params),
    
};