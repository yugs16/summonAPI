
var database ;
if(process.env.NODE_ENV === 'development'){
	//console.log("here1");
	database = 'mongodb://summonapi:MEwCatAykAcAxA1@ds127801.mlab.com:27801/summonapi';	
}
else if(process.env.NODE_ENV === 'production'){
	//console.log("here2");
	database = 'mongodb://summonapi:MEwCatAykAcAxA1@ds127801.mlab.com:27801/summonapi'
}
else{
	//console.log("here3");
	database = 'mongodb://localhost:27017/summonapi'
}
module.exports={

	'database':database,
	'port':process.env.PORT || 8000,
	'secret': 'mySummon',
	'passwordKey':'mySummon',
	'path':__dirname
	//"secretKey":"Yoursecretkey"
}