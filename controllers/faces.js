var oxford = require('project-oxford');
const say = require('say');
var client = new oxford.Client('28d68cd2760e47fc913b7b8619378b84');

function includeASearchFace(groupname,imgpath,personname){
   client.face.faceList.addFace(groupname,{
    url : imgpath,
    name : personname
   })
   .catch(function(e) {
      console.log(e); // "Something went wrong!"
   }).then(function (){
      console.log("Face Added");
   });
}

function createNewFaceList(ListIdName,ListName){
  client.face.faceList.create(ListIdName,{
    name : ListName
  })
  .catch(function(e) {
    console.log(e); // "Something went wrong !"
   }).then(function (){
   console.log("Created Your FaceList");
  });
}

function findKnownFaces(DetectId,searchFaceListName){
  client.face.similar(DetectId,{
    candidateFaceListId : searchFaceListName,
    mode: "matchFace"
  }).catch(function(e) {
     console.log(e); // "oh, no!"
  }).then(function (response) {
   if (response[0] != null) {
        if (response[0].confidence > 0.5) {
          say.speak('Hello ' + searchFaceListName)
          console.log("Good Match - Found you");
          console.log(response);
       } else {
         console.log("Poor match!");
         console.log(response);
       }
   } else {
     console.log("Poor or No Match");
     console.log(response);
  }
  });
}

function runAll(imageFileName,searchFaceListName){
  client.face.detect({
      path: imageFileName,
      analyzesAge: true,
      analyzesGender: true,
      returnFaceId : true
   }).then(function (response) {
      DetectId = response[0].faceId;
      findKnownFaces(DetectId,searchFaceListName);
   });
}

module.exports = function (app) {

  app.get('/detect', (req, res) => {

    const facelist = ['ryan', 'sam'];

    const sam_url = 'https://cdn.filestackcontent.com/QGaBPrdFQnGKLXx9tGlX';
    const ryan_url = 'https://cdn.filestackcontent.com/pZKWut31Qd6uli06dqJw';

// mac address
// f018981891e1
    // for(item in facelist){
    //   createNewFaceList(facelist[item],facelist[item] + " pictures");
    // }
    console.log("**********************")

    // includeASearchFace(facelist[1],sam_url,'Sam');
    // includeASearchFace(facelist[0],ryan_url,'Ryan');

    for( item in facelist){
      console.log('checking ' + facelist[item])
      runAll('/Users/samharrison/code/droneswarmy/controllers/RyanPhoto.jpg',facelist[item])
    }


    // console.log(client.face.faceList);

    /* client.face.detect({
       path: '/Users/samharrison/code/droneswarmy/controllers/RyanPhoto.jpg',
       analyzesAge: true,
       analyzesGender: true,
       returnFaceId: true
    }).then(function (response) {
      client.face.similar(response[0].faceId,{
        candidateFaceListId : facelist
      }).catch(function(e) {
        console.log("oh no!");
        console.log(e); // "oh, no!"
      }).then (function (anotha_response) {
        console.log("______detection")
        console.log(anotha_response);
      });
      console.log("this ran");
      res.json(response);
      console.log('this ran after');
    });*/
  });

    app.get('/', (req, res) => {
      res.render("index.handlebars");
    });
}
