var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var user=new mongoose.Schema({
	username:{type:'String',default:''},
	email:{type:'String',default:''},
	password:{type:'String',default:''}
},{collection: 'users' });

module.exports = mongoose.model('user',user);

