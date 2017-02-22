


module.exports=function(app,express){
	
    var api = express.Router();
	console.log("came in routesjs 7");


	api.get('/signin', function(req, res) {

		console.log("in routes get");
		//res.render('../public/index.html');
		// res.render('./public/index.html');
		res.json("from routes 15");
	});

	//var api = express.Router();
	// app.get('/', function (req, res) {
	// 	console.log("came in routes");
	// 	console.log(__dirname+"../public/index.html");
	// 	   res.sendFile(__dirname+"../public/index.html");
	//   // res.sendFile(path+'public/index.html');
	// });

  return api ;

}