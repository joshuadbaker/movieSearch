var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
// must require bodyParser
var bodyParser = require('body-parser');
var path = require('path');

// configuration =================

mongoose.connect('mongodb://localhost/test'); 
var database = mongoose.connection;     // connect to mongoDB database
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function (callback) {});

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// must close each open parens
app.use('/', express.static(path.join(__dirname, 'public')));

// define model --------------------------
var Movie = mongoose.model('Movie', {
  title: String,
  // year: Number,
  // release: String,
  // director: String,
  // genre: String
})

// routes --------------------------------
// must close out anonymous function, identify pattern of '}); and understand how anonymous functions work'


// app.get('/favorites', function(request, response){
//   var data = fs.readFileSync('./data.json');
//   response.setHeader('Content-Type', 'application/json');
//   response.send(data);
// });

// app.get('/favorites', function(request, response){
//   // close out conditional statements, follow pattern 
//   if(!request.body.name || !request.body.oid){
//     response.send("Error");
//     return
//   }
  
//   var data = JSON.parse(fs.readFileSync('./data.json'));
//   data.push(request.body);
//   fs.writeFile('./data.json', JSON.stringify(data));
//   response.setHeader('Content-Type', 'application/json');
//   response.send(data);
// });

// Express Routes to connect JSON data to the Mongoose MongoDB
// Get a list of favorite films
app.get('/favorites', function(request, response) {
  Movie.find(function(error, favorites) {
    if(error) {
      response.send(error)
    }
    response.json(favorites);
  });
});

app.post('/favorites', function(request, response) {
  Movie.create({
    title: request.newFilm.title,
    done: false
  }, function(error, movie) {
    if(error) {
      response.send(error);
    }

    Movie.find(function(error, movies) {
      if(error) {
        response.send(error)
      }
      response.json(movies);
    });
  });
});

app.get('*', function(request, response) {
  response.sendfile('./public/index.html')
})
// listen not list
app.listen(3000, function(){
  console.log("Listening on port 3000");
});