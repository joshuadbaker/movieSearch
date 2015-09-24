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

// routes --------------------------------
// must close out anonymous function, identify pattern of '}); and understand how anonymous functions work'
app.get('/favorites', function(request, response){
  var data = fs.readFileSync('./data.json');
  response.setHeader('Content-Type', 'application/json');
  response.send(data);
});

app.get('/favorites', function(request, response){
  // close out conditional statements, follow pattern 
  if(!request.body.name || !request.body.oid){
    response.send("Error");
    return
  }
  
  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(request.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  response.setHeader('Content-Type', 'application/json');
  response.send(data);
});

// route for persisting data
app.post('/index', function (request, response) {
   console.log(request);
   console.log('request received');
   response.redirect('/index');
});

// route for displaying persisted data
app.get('/favorites', function (request, response) {
   console.log(request);
   console.log('request received');
   response.redirect('/favorites');
});

app.get('*', function(request, response) {
  response.sendfile('./public/index.html')
});
// listen not list
app.listen(3000, function(){
  console.log("Listening on port 3000");
});