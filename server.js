//yugal token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsidXNlcm5hbWUiOiJpbml0IiwiZW1haWwiOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwiX192IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwidXNlcm5hbWUiOnRydWUsImVtYWlsIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7InVzZXJuYW1lIjoibG92aW5neXVncyIsImVtYWlsIjoibG92aW5neXVnc0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQiLCJfX3YiOjAsIl9pZCI6IjU4YjVlMWQwZTQ5YWY4MjFhOTM3MTFjYyJ9LCJpYXQiOjE0OTAzMDc0MjAsImV4cCI6MTQ5MDM5MzgyMH0.E9P60RvrBs7Agg-3KzJUzFxC4CJdchbQefkt0quqrMQ

var express = require('express');
var app = express(),
	config=require('./config'),
	mongoose=require('mongoose');
	bodyParser=require('body-parser'),
	morgan   = require('morgan');

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


app.get('*`',function(req,res){
		
  	console.log("**came");
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