var User = require('./models/user'),
	Post = require('./models/post');
var config=require('../config'), 
	jwt=require('jsonwebtoken'),
	autho = require("node-autho");	

var superSecret = config.secret,
	passwordKey = config.passwordKey;

var loggedOnUser =false;

module.exports=function(app,express){
	
    var api = express.Router();
	console.log("came in routesjs 7");
	//app.set('superSecret', config.secret); 
	api.post('/signin', function(req, res) {
		console.log(superSecret);
		
		User.findOne({
			username: req.body.username
		}).exec(function(err, user) {

			//console.log(user);
			if (err) throw err;

			if (!user) {
				res.json({ success: false, message: 'Authentication failed. User not found.' });
			} else if (user) {

				// check if password matches
				var decrypted = autho.decrypt(user.password, passwordKey);
				if (decrypted != req.body.password) {
					res.json({ success: false, message: 'Authentication failed. Wrong password.' });
				} else {
					var data = {
						username:user.username,
						email:user.email
					};
					//console.log(data);

					var token = jwt.sign({
						username:user.username,
						email:user.email,
						userId:user._id
					}, superSecret,{ expiresIn:'1h'});

					res.cookie('connect_auth', token, {  
						expires: new Date(Date.now() + 30*60*1000), //hrs*mins*secs*minisecs
  						httpOnly: false
   					});

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

		User.findOne({
			$or:[ {username:req.body.username}, {email:req.body.email}]
		},function(err,user){

			if (err) throw err;

			if(user){
				res.status(400).json({
					"msg":"User already exists.",
					"check":0
				})
			}
			else{
				var password = autho.encrypt(req.body.password,passwordKey);
				req.body.password = password;
				var user=new User(req.body);
				user.save(function(err,instance){
					if(err) 
						throw err;
					if(!instance){
						res.status(200).json({
							"check":0,
							"msg":"OOPS! Something went Wrong."
						});
					}
					else{
						console.log('Server -- User saved successfully!');
						res.status(200).json({
							"check":1,
							"msg":"User saved successfully! Now Signin."
						});
					}
				});
			}
		})
	});


	api.get('/checkout',function(req,res){
		console.log("came in login");
		res.sendFile(config.path +'/public/test.html');
	});

	api.use(function(req, res, next) {

		// check header or url parameters or post parameters for token

		var token;
		console.log(req.cookies);
		// console.log(req.cookies.connect_auth);
		if(req.cookies.connect_auth){
			token = req.cookies.connect_auth;
		}
		else{
			token = req.body.token || req.query.token || req.headers['x-access-token'];
		}
		if (token) {
			jwt.verify(token,superSecret, function(err, decoded) {      
			  if (err) {
			    return res.json({ success: false, message: 'Failed to authenticate token.' });    
			  } else {
				    // if everything is good, save to request for use in other routes
				   	req.loggedOnUser =true;
				   	console.log(decoded);
				   	req.body.decoded = decoded;  
				   	// console.log(decoded._doc);
				   	req.token = token; 
				   	User.findOne({ 
				   		_id:req.body.decoded.userId,
				   		email:req.body.decoded.email
				   	},function(err,user){
				   		if(user){
				   			next()
				   		}
				   		else{
				   			res.status(404).json({
				   				"success":false,
				   				"msg":"Not Our User"
				   			});
				   		}
				   	})
				}
			});
		} else {
			req.loggedOnUser = false;
			next();
			// res.status(403).send({ 
			//     success: false, 
			//     message: 'No token provided.' 
			// });

		}
	});
	
	api.get('/payments',function(req,res){
		console.log("came in 8000 /payments");
		console.log(config.path);
		console.log(config.path +'/public/test.html');
		res.sendFile(config.path +'/public/test.html');

		// res.sendFile(config.path +'/public/test.html');
		res.redirect(302,'http://localhost:8000/api/checkout');

		//res.redirect(302,'http://localhost:8000/api/checkout-login?token='+req.token);
	});


	api.get('/users',function(req,res){
		console.log("in routesjs /users");
		console.log(req.body);

		User.find({},function(err,user){
			if(err) throw err;
			// console.log(user);
			res.json(user);
		});
	});

	api.get('/me',function(req,res){
		//console.log(loggedOnUser);
		
		if(req.loggedOnUser){
			console.log("in routesjs /users");
			var data = {
				username:req.body.decoded.username,
				email:req.body.decoded.email,
				token:req.token,
				loggedOnUser:true
			};
			//console.log(req.body);
			res.status(200).json(data);
		}
		else{
			// var data = [
			// 	{
			// 		title:

			// 	},{

			// 	}
			// ]

			res.status(200).json({
				trending:true,
				loggedOnUser:false
			});
		}
	});

	api.post('/addPost',function(req,res){
		if(req.loggedOnUser){
			console.log("add post");
			//console.log(req.body.decoded);
			User.findOne({
					_id:req.body.decoded.userId,
					email:req.body.decoded.email	
			}).exec(function(err,user){
				//console.log(user);
				if(err) throw err;
				if(user){
					//console.log(req.body);
					var post = new Post(req.body);
					post.userId = user._id;
					post.rating = 0;
					post.createdAt = Date.now();
					post.save(function(err,instance){
						//console.log(instance);
						if(instance){
							console.log("Inserted");
							console.log(user.post_cnt);
							var cnt= user.post_cnt+1;
							var update = {'post_cnt':cnt,$push:{'posts.to':instance._id}};
							user.update({'post_cnt':cnt,$push:{'posts':instance._id}},function(err,user){
								console.log("updated");
								res.status(200).json({
									status:200,
									status_info:"success",
									msg:"Post Insterted successfully"
								})
							})
						}else{
							console.log("Problem");
							res.status(200).json({
								status:400,
								status_info:"error",
								msg:"Post Instertion failed"
							})
						}
					})
				}
			});
		}
		else{
			// res.redirect(304,'/login');
			res.json({
				'redirectUrl':'/login',
				'loggedOnUser':false
			})
		}
	})

  return api ;
}