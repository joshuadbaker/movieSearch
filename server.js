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
// I'm not sure if fs.writeFile is the correct method to use in this case.  Whatever data I send to the data.json file reaplces what ever is there instead of adding to it.  
app.post('/index', function (request, response) {
   console.log(request.body);
   fs.writeFile('./data.json', JSON.stringify(request.body));
});

// listen not list
// call the 'listen' method on either the Heroku assigned server port OR(||) local host
app.listen(process.env.PORT || 8080);





