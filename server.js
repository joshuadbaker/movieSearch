var express = require('express');
var app = express();
var fs = require('fs');
// must require bodyParser
var bodyParser = require('body-parser');
var path = require('path');

// configuration =================

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// must close each open parens
app.use('/', express.static(path.join(__dirname, 'public')));

// routes
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
   console.log(request.body);
   fs.writeFile('./data.json', JSON.stringify(request.body));
   // fs.appendFile('./data.json', JSON.stringify(request.body)+', ');
});

// app.get('*', function(request, response) {
//   response.sendFile('application/public/index.html')
// });
// listen not list
app.listen(8080, function(){
  console.log("Listening on port 8080");
});