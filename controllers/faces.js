const oxford = require('project-oxford');

module.exports = function (app) {

  app.get('/detect', (req, res) => {

    const oxc = new oxford.Client('28d68cd2760e47fc913b7b8619378b84');

    loadFaces = function() {
      const sam_url = 'https://cdn.filestackcontent.com/QGaBPrdFQnGKLXx9tGlX';
      const ryan_url = 'https://cdn.filestackcontent.com/pZKWut31Qd6uli06dqJw';
      oxc.face.faceList.create('myFaces');
      oxc.face.faceList.addFace('myFaces', {url : sam_url, name : 'Sam'});
      oxc.face.faceList.addFace('myFaces', {url : ryan_url, name : 'Ryan'});
    }

    function createNewFaceList(ListIdName,ListName){
      client.face.faceList.create(ListIdName,{
        name : ListName
      })
      .catch (function(e) {
        console.log(e); // "Something went wrong !"
      }).then (function (){
        console.log("Created Your FaceList");
      });
    }

    // console.log(oxc.face.faceList.myFaces);

    oxc.face.detect({
      path: '/Users/samharrison/code/droneswarmy/controllers/RyanPhoto.jpg',
      analyzesAge: true,
      analyzesGender: true,
      returnFaceId: true
    }).then(function (response) {
      oxc.face.similar(response[0].faceId,{
        candidateFaceListId : "MyFaces"
      }).catch(function(e) {
        console.log(e); // "oh, no!"
      }).then (function (anotha_response) {
        console.log("______detection")
        console.log(anotha_response);
      });
      console.log("this ran");
      res.json(response);
    });
  });

  app.get('/', (req, res) => {
    res.render("index.handlebars");
  });
}
