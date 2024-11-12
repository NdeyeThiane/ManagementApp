const { app } = require('./app/app');
const pool = require('./app/app');
const port = process.env.PORT || 3080;
require('dotenv').config();


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


