var express = require('express');
var app = express();

// app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');


app.get('/', function (req, res) {
  res.render('index.html');
})


app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});

