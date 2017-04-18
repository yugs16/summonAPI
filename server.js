
var express = require('express');
var app = express(),
	config=require('./config'),
	mongoose=require('mongoose');
	bodyParser=require('body-parser'),
	morgan   = require('morgan'),
	cookieParser = require('cookie-parser');

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
// app.set('superSecret', config.secret);
// require('./app/routes')(app);

// config.path = __dirname;
// app.set(config.path);

app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json()); // parse application/json

// app.use(bodyParser.json({ type: 'json/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(morgan('dev'));
var api=require('./app/routes')(app,express);
app.use('/api',api);



app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');

app.use('/js',express.static(__dirname + '/public'));


app.get('*',function(req,res){

  	console.log("**came");
  	// res.json({});
   res.redirect('/');
   // res.sendFile(__dirname +'/public/index.html');
});

// app.get('/', function (req, res) {
//   res.render('index.html');
// })


// app.get('/signin',indexControllers.create);

app.listen(config.port, function (err) {
	if(err){
    	console.log(err);
    }
    else{
    	console.log("listing on port %s",config.port);
    }
});

// exports = module.exports = app;
