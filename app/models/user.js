var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var user=new mongoose.Schema({
	username:{type:'String',default:''},
	email:{type:'String',default:''},
	password:{type:'String',default:''},
	post_cnt:{type:'Number',default:0},
	posts:['String'],
	user_rating:{type:"Number",default:1}
},{collection: 'users' });

module.exports = mongoose.model('User',user);

