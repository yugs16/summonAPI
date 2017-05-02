
var database ;
if(process.env.NODE_ENV === 'development'){
	//console.log("here1");
	database = 'mongodb://summonapi:MEwCatAykAcAxA1@ds127801.mlab.com:27801/summonapi';	
	database = process.env.MONGO_URI;
}
else if(process.env.NODE_ENV === 'production'){
	//console.log("here2");
	database = 'mongodb://summonapi:MEwCatAykAcAxA1@ds127801.mlab.com:27801/summonapi'
	database = process.env.MONGO_URI;
}
else{
	//console.log("here3");
	database = 'mongodb://localhost:27017/summonapi'
	//database = 'mongodb://summonapi:YidFamcecouQuo2@ds127801.mlab.com:27801/summonapi'
	// YidFamcecouQuo2

}
module.exports={

	'database':database,
	'port':process.env.PORT || 8000,
	'secret': 'mySummon',
	'passwordKey':'mySummon',
	'path':__dirname
	//"secretKey":"Yoursecretkey"
}