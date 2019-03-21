const arDrone = require('ar-drone');

const http = require('http');

// const ffmpeg = require('ffmpeg');

const pngStream = arDrone.createClient().getPngStream();

var lastPng;
pngStream
  .on('error', console.log)
  .on('data', (pngBuffer) => {
    lastPng = pngBuffer;
  });

const server = http.createServer((req, res) => {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Did not receive any png data yet.');
    return;
  }

  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(lastPng);
});

server.listen(8080, () => {
  console.log('Serving latest png on port 8080 ...');
});
