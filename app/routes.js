var user = require('./models/user');


module.exports=function(app,express){
	
    var api = express.Router();
	console.log("came in routesjs 7");

	
	api.post('/signup', function(req, res) {

		console.log("in routesjs 11 a get");
		console.log(req.headers);
		console.log(req.body);
	});
  return api ;
}
