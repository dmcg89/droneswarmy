var oxford = require('project-oxford');

module.exports = function (app) {

  app.get('/detect', (req, res) => {

    let oxc = new oxford.Client('28d68cd2760e47fc913b7b8619378b84');

    loadFaces = function() {
      const sam_url = 'https://cdn.filestackcontent.com/QGaBPrdFQnGKLXx9tGlX';
      const ryan_url = 'https://cdn.filestackcontent.com/pZKWut31Qd6uli06dqJw';
      oxc.face.faceList.create('myFaces');
      oxc.face.faceList.addFace('myFaces', {url : sam_url, name : 'Sam'});
      oxc.face.faceList.addFace('myFaces', {url : ryan_url, name : 'Ryan'});
    }

      oxc.face.detect({
       path: './RyanPhoto.jpg',
       analyzesAge: true,
       analyzesGender: true
      }).then(function (response) {
        console.log("this ran");
        res.json(response);
      });
    });

    app.get('/', (req, res) => {
      res.render("index.handlebars");
    });
}
