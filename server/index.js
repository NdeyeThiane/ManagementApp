const { app } = require('./app/app');
const pool = require('./app/app');
require('dotenv').config();
const port = process.env.PORT || 3080;



app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


