const arDrone = require('ar-drone');
// var app = express();
// var path = require('path');

const client = arDrone.createClient();
// var client = arDrone.createClient({ip: '0.0.0.0'});

// client.createRepl();

// console.log('takeoff');
client.takeoff();
// console.log('calibrate');
// client.calibrate(0);
// console.log('spin');
// client.clockwise(0.5);
// console.log('hover');
// client.stop();
// console.log('land');
// client.land();
// // client.land();
// // client.takeoff();
client
  .after(5000, () => {
    client.calibrate(0);
  })
  // .after(5000, () => {
  //   client.clockwise(0.5);
  // })
  // .after(5000, () => {
  //   client.calibrate(0);
  // })
  .after(1000, () => {
    client.animate('flipBehind', 500);
  })
  .after(1000, () => {
    client.calibrate(0);
  })
  .after(1000, () => {
    client.stop();
  })
  // .after(5000, () => {
  //   this.stop();
  // })
  .after(1000, () => {
    client.land();
  });
