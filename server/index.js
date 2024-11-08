const { app } = require('./app/app');
const pool = require('./app/app');
const port = 3080;


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


module.exports = app;