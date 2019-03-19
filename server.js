const express = require('express');

const app = express();

const handlebars = require('express-handlebars');

const path = require('path');

// Lines used to set up the view engine handlebars
app.engine('handlebars', handlebars({
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts', // eslint-disable-line
}));

module.exports = app;

const faces = require('./controllers/faces')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
