var User = require('./models/user');

var cookieParser=require('cookie-parser'),
	session=require('express-session');

var setCookie=require('set-cookie');
module.exports=function(app,express){
	
    var api = express.Router();
	console.log("came in routesjs 7");

	
	api.post('/signup', function(req, res) {

		console.log("in routesjs 11 ");
		// console.log(req.headers);
		console.log(req.body);
		//res.json("from routes 15");

		var user=new User(req.body);
		user.save(function(err){
			if(err) 
				throw err;
			else{
				console.log('Server -- User saved successfully!');
				res.status("User saved successfully!").json(check=1);
			}

		})
	});


	api.post('/signin', function(req, res) {

		console.log("in routesjs 32 ");
		// console.log(req.headers);
		console.log(req.body);
		//res.json("from routes 15");
		//var user=new User(req.body);
		
		user.find({username:req.body.username,password:req.body.password},function(err,user){
			if(err) throw err;
			console.log("routes 43");
			console.log(user);
			setCookie('login-cookie','1234',{});
			var data={
				check:1,
				cookieName:'login-cookie'
			};

			res.status("User found").json(data);
		})
	});
  return api ;
}
