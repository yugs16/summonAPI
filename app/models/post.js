var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var post=new mongoose.Schema({
	userId:{type:"String",default:'',required:true},
	title:{type:'String',default:'',required:true},
	api_link:{type:'String'},
	rating:"Number",
	public_post:{type:'boolean'},
	private_post:{type:'boolean'},
	code_file:"String",
	git_account:{
		git_id:"String",
		git_username:"String",
		git_repo:["String"]
	},
	description:{type:'String',default:'',required:true},
	tags:["String"],
	createdAt:{type:'date',default:Date.now}
},{collection: 'posts'});

module.exports = mongoose.model('Post',user);

