var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var post=new mongoose.Schema({
	userId:{type:"String",default:'',required:true},
	title:{type:'String',default:'',required:true},
	description:{type:'String',default:'',required:true},
	tags:{type:'Array',default:''},
	createdAt:{type:'Date'}
},{collection: 'posts'});

module.exports = mongoose.model('Post',user);

