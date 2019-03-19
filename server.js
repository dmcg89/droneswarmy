const express = require('express');

const app = express();

const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars({
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts', // eslint-disable-line
}));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
