
var express = require('express');
var app = express(),
	config=require('./config'),
	//indexControllers=require('./app/controllers/index-controllers'),
	mongoose=require('mongoose');
	bodyParser=require('body-parser');

// app.use(express.static(__dirname + '/public'));

// var router = express.Router();
//var path=require('path');
// app.use('path');
mongoose.connect(config.database,function(err){
	if(err){
        console.log("error connecting")
		console.log(err);
	}
	else{
		console.log('Connected to the database');
	}
});

// require('./app/routes')(app); 

var api=require('./app/routes')(app,express);
app.use('/api',api);


app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');

app.use('/js',express.static(__dirname + '/public'));


app.get('*',function(req,res){
	console.log("from server 40");
    //res.sendFile(__dirname +'/public/index.html'); 
})

// app.get('/', function (req, res) {
//   res.render('index.html');
// })


// app.get('/signin',indexControllers.create);

app.listen(config.port, function (err) {
	if(err){
    	console.log(err);
    }
    else{
    	console.log("listing on port 8000");
    }
});

exports = module.exports = app;