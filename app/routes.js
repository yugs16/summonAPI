var User = require('./models/user');
var config=require('../config'), 
	jwt=require('jsonwebtoken');

var superSecret = config.secret;

module.exports=function(app,express){
	
    var api = express.Router();
	console.log("came in routesjs 7");
	//app.set('superSecret', config.secret); 
	api.post('/authenticate', function(req, res) {
		console.log(superSecret);
		User.findOne({
			username: req.body.username
		}, function(err, user) {

			if (err) throw err;

			if (!user) {
				res.json({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {

				// check if password matches
				if (user.password != req.body.password) {
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				} else {

					// if user is found and password is right
					// create a token
					var token = jwt.sign(user, superSecret,{ expiresIn:'2m'});

					// return the information including token as JSON
					res.json({
					  success: true,
					  message: 'Enjoy your token!',
					  token: token
					});
				}   
			}
		});
	});

	
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
				res.json(check=1);
			}
		})
	});


	api.post('/signin', function(req, res) {

		console.log("in routesjs 35 ");
		// console.log(req.headers);
		console.log(req.body);
		//res.json("from routes 15");
		//var user=new User(req.body);
		
		User.findOne({username:req.body.username,password:req.body.password},function(err,user){
			if(err) throw err;
			console.log("routes 43");
			console.log(user);
			// setCookie('login-cookie','1234',{});
			var data={
				check:1,
				cookieName:'login-cookie'
			};
			res.json(data);
		})
	});

	api.use(function(req, res, next) {

		// check header or url parameters or post parameters for token
		var token = req.body.token || req.query.token || req.headers['x-access-token'];

		// decode token
		if (token) {

			// verifies secret and checks exp
			jwt.verify(token,superSecret, function(err, decoded) {      
			  if (err) {
			    return res.json({ success: false, message: 'Failed to authenticate token.' });    
			  } else {
			    // if everything is good, save to request for use in other routes
			    req.decoded = decoded;   
			    console.log(decoded._doc); 
			    next();
			  }
			});

		} else {

			// if there is no token
			// return an error
			return res.status(403).send({ 
			    success: false, 
			    message: 'No token provided.' 
			});

			}
	});

	api.get('/users',function(req,res){
		console.log("in routesjs 86");
		// console.log(req);
		User.find({},function(err,user){
			if(err) throw err;
			console.log(user);
			res.json(user);
		});

	});

	

  return api ;
}
