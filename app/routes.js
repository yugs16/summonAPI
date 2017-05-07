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

					var token = jwt.sign({
						username:user.username,
						email:user.email,
						userId:user._id
					}, superSecret,{ expiresIn:'1h'});

					res.cookie('connect_auth', token, {  
						expires: new Date(Date.now() + 1*30*60*1000), //hrs*mins*secs*minisecs
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
				user.createdAt = Date.now();
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

	api.use(function(req, res, next) {

		// check header or url parameters or post parameters for token

		var token;
		//console.log(req.cookies);
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
				   	//console.log(decoded);
				   	req.body.decoded = decoded;  
				   	// console.log(decoded._doc);
				   	req.token = token; 
				   	User.findOne({ 
				   		_id:req.body.decoded.userId,
				   		email:req.body.decoded.email
				   	},function(err,user){
				   		if(user){
				   			req.user = user;
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
		}
	});

	api.get('/users',function(req,res){
		//console.log("in routesjs /users");
		//console.log(req.body);

		User.find({},function(err,user){
			if(err) throw err;
			// console.log(user);
			res.json(user);
		});
	});

	api.get('/me',function(req,res){
		//console.log(loggedOnUser);
		
		if(req.loggedOnUser){
			console.log("LoggedOnUser");
			var i=0;
			var dataToSend = {
				username:req.body.decoded.username,
				email:req.body.decoded.email,
				profile_pic:req.user.profile_pic,
				loggedOnUser:true,
				posts:[],
			}
			// Post.find({userId:req.body.decoded.userId},function(err,posts){
			Post.find({},function(err,posts){
				//console.log(posts);
				if(posts === null || posts.length === 0){
					res.status(200).json(dataToSend);
				}
				else{
					console.log("No of posts: %s",posts.length);
					posts.forEach(function(onePost){
						var vote_active =0;
						User.findOne({ _id:onePost.userId},function(err,instance){
							var r = onePost.toObject();
							var votes=r.votes;
							for(j=0;j<r.votes.length;j++){
	 							if(req.user.id === votes[j].userId){
	 								if(votes[j].vote)
	 									vote_active = 1;
	 								else{
	 									vote_active = -1;
	 								}
	 								break;
	 							}
	 							console.log('in for');
							}
							console.log("Out of for");
							delete r.votes;
							r.userInfo = {
								userId:instance._id,
								username:instance.username,
								email:instance.email,
								user_rating:instance.rating,
								profile_pic:instance.profile_pic,
								vote_active:vote_active
							}
							dataToSend.posts.push(r);
							i++;
							if(posts.length === i){
								res.status(200).json(dataToSend);
							}
						})
					})	
				}	
			})
			//console.log(req.body);
		}
		else{
			console.log("Not logged on");
			var i=0;
			var dataToSend={
				trending:true,
				loggedOnUser:false,
				posts:[]
			};
			Post.find({haveTrendingAccess:true},function(err,posts){
				if(err) throw err;
				//console.log("in query")
				//console.log(posts);
				if(posts === null || posts.length<=0){
					console.log(posts);
					console.log("Post is null");
					res.status(200).json(dataToSend);
				}
				else{
					posts.forEach(function(onePost){
						User.findOne({ _id:onePost.userId},function(err,instance){
							var r = onePost.toObject();
							r.userInfo = {
								userId:instance._id,
								username:instance.username,
								email:instance.email,
								user_rating:instance.rating,
								profile_pic:instance.profile_pic
							}
							dataToSend.posts.push(r);
							i++;
							if(posts.length === i){
								res.status(200).json(dataToSend);
							}
						})
					})					
				}
			});	
		}
	});

	api.post('/addPost',function(req,res){
		if(req.loggedOnUser){
			console.log("Logged onAdd post");
			//console.log(req.body.decoded);
			User.findOne({
					_id:req.body.decoded.userId,
					email:req.body.decoded.email	
			}).exec(function(err,user){
				//console.log(user);
				if(err) throw err;
				if(user){
					console.log(req.body);
					var post = new Post(req.body);
					post.userId = user._id;
					post.createdAt = Date.now();
					post.save(function(err,instance){
						//console.log(instance);
						if(instance){
							console.log("Inserted");
							console.log(user.post_cnt);
							var cnt= user.post_cnt+1;
							var increaseCnt = user.contributions_cnt+1;
							var points = user.contributions_points+10;
							var update = {'post_cnt':cnt,$push:{'posts.to':instance._id}};
							user.update({'post_cnt':cnt,'contributions_cnt':increaseCnt,'contributions_points':points,$push:{'posts':instance._id}}
								,function(err,user){
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


	api.post('/editvote',function(req,res){
		if(!req.loggedOnUser){
			res.json({
				'redirectUrl':'/login',
				'loggedOnUser':false
			});
		}
		else{
			if(!req.body.postId && (req.body.vote === null)){
				//console.log("came in if for /editvote");
				res.json({msg:"failure",info:"Check for postId or is vote there."});
			}
			else{
				console.log(req.body);

				User.findOne({_id:req.body.decoded.userId}).exec(function(err,user){
					Post.findOne({_id:req.body.postId},function(err,instance){
						var vote_cnt=0;
						var vote_update_in;
						var new_vote_active=0;
						if(!instance || req.body.vote == null){
							res.json({msg:"No Post to Vote"})
						}
						else{
							if(req.body.vote === true || req.body.vote === "true"){
								vote_update_in = "up_vote_cnt";
								if(req.body.vote_active == 1)
								{
									console.log("already upvote");
									vote_cnt = instance.up_vote_cnt-1;
									user.contributions_array.upvotes = user.contributions_array.upvotes -1;
									user.contributions_cnt = user.contributions_cnt-1;
									user.contributions_points = user.contributions_points-1;	
								}
								else
								{
									vote_cnt = instance.up_vote_cnt+1;
									user.contributions_array.upvotes = user.contributions_array.upvotes +1;
									user.contributions_cnt = user.contributions_cnt+1;
									user.contributions_points = user.contributions_points+1;	
									new_vote_active = 1;
								}	
								instance.up_vote_cnt=vote_cnt;
							}
							else{
								vote_update_in = "down_vote_cnt";
								if(req.body.vote_active == -1)
								{
									vote_cnt = instance.down_vote_cnt-1;
									user.contributions_array.upvotes = user.contributions_array.upvotes -1;
									user.contributions_cnt = user.contributions_cnt-1;
									user.contributions_points = user.contributions_points-1;
								}	
								else
								{	vote_cnt = instance.down_vote_cnt+1;
									user.contributions_array.downvotes = user.contributions_array.downvotes + 1;	
									user.contributions_cnt = user.contributions_cnt+1;
									user.contributions_points = user.contributions_points+1;	
									new_vote_active = -1;
								}
								instance.down_vote_cnt=vote_cnt;
							}
							user.save(function(err,updatedUser){
								//console.log(updatedUser);
							})
							
							instance.save(function(err,modified){

							});

							var dataToSend = {
								postId:instance._id,
								vote:req.body.vote,
								vote_active:new_vote_active,
								status:200
							};
							if(req.body.vote){
								dataToSend.up_vote_cnt=vote_cnt;
							}
							else{
								dataToSend.down_vote_cnt=vote_cnt;
							}

							var update;

							if(req.body.vote_active === 1 || req.body.vote_activ === -1){
								update = { $pull: { 'votes': { userId: req.user._id }} }
							}
							else{
								update = { $push:{	'votes':{
											vote_user_rating:req.user.user_rating,
											vote:req.body.vote,
											userId:req.body.decoded.userId
										}
									}
								}
							}
							instance.update(update,function(err,updatedInstance){
								console.log(updatedInstance);
								if(updatedInstance.ok === 1 && updatedInstance.nModified === 1){
									res.status(200).json(dataToSend);
								}
								else
									res.send({status:400,postId:instance._id})
							});
						}
					})	
				})
			}
		}
	})

	api.get('/details',function(req,res){
	
		if(!req.loggedOnUser){
			res.json({
				'redirectUrl':'/login',
				'loggedOnUser':false
			});
		}
		else{
			Post.findOne({_id:req.query.postId},function(err,post){
				//console.log(post);
				//dataToSend = posts;
				var dataToSend={
					loggedOnUser:true,
				};
				if(post === null || post.length === 0){
					console.log("No post");
					res.status(200).json(dataToSend);
				}
				else{
					User.findOne({ _id:post.userId},function(err,instance){
						var r = post.toObject();
						var vote_active=0;
						var votes=r.votes;
						for(j=0;j<r.votes.length;j++){
 							if(req.user.id === votes[j].userId){
 								if(votes[j].vote)
 									vote_active = 1;
 								else{
 									vote_active = -1;
 								}
 								break;
 							}
 						}
						delete r.votes;
						dataToSend.post = r;
						dataToSend.userInfo = {
							userId:instance._id,
							username:instance.username,
							email:instance.email,
							user_rating:instance.rating,
							profile_pic:instance.profile_pic,
							vote_active:vote_active
						}
						res.send(dataToSend);
					})					
				}
			});	
		}
		
	})
  return api ;
}
