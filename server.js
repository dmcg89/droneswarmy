const express = require('express');

const app = express();

const hbs = require('express-handlebars');

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts', // eslint-disable-line
}));

module.exports = app;

const faces = require('./controllers/faces')(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
