const express = require('express');

const app = express();

const handlebars = require('express-handlebars');

const path = require('path');

const arDrone = require('ar-drone');

const client = arDrone.createClient();

const http = require('http');

// Lines used to set up the view engine handlebars
app.engine('handlebars', handlebars({
  extname: 'handlebars',
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts', // eslint-disable-line
}));

module.exports = app;

// const faces = require('./controllers/faces')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
//   res.render('index');
// });
app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/land', function(req, res) {
 client.land();
});

app.get('/takeoff', function(req, res) {
 client.takeoff();
});

var pngStream = client.getPngStream();

pngStream
 .on('error', console.log)
 .on('data', function(pngBuffer) {
       sendPng(pngBuffer);
 }

function sendPng(buffer) {
 res.write('--daboundary\nContent-Type: image/png\nContent-length: ' + buff
er.length + '\n\n');
 res.write(buffer);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
