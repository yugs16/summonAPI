
var database;
if(process.env.NODE_ENV === 'development'){
	database:'mongodb://summonapi:TUlnictUrtuldA7@ds115671.mlab.com:15671/summonapi'
}
else if(process.env.NODE_ENV === 'production'){
	database:'mongodb://summonapi:TUlnictUrtuldA7@ds115671.mlab.com:15671/summonapi'
}
else{
	 database = 'mongodb//localhost:27017/summonapi',
}

module.exports={

	'database':database,
	'port':process.env.NODE_ENV || 8000,
	'secret': 'mySummon',
	'passwordKey':'mySummon',
	'path':__dirname,
	//"secretKey":"Yoursecretkey"
}