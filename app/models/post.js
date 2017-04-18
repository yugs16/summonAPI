var mongoose = require('mongoose');

// define our nerd model
// module.exports allows us to pass this to other files when it is called
var post=new mongoose.Schema({
	userId:{type:"String",default:'',required:true},
	title:{type:'String',default:'',required:true},
	description:{type:'String',default:'',required:true},
	api_link:{type:'String'},
	rating:{type:"Number",default:0},
	public_post:{type:'boolean'},
	private_post:{type:'boolean'},
	code_file:"String",
	git_link:"String",
	views:{type:"Number",default:0},
	vote_cnt:{type:"Number",default:0},
	votes:[{
		vote_type:{type:"Number",default:1},              //its user raitng... 4 star user 3star user.
		vote:{type:"boolean"},
		userId:{type:"String"},
		_id:false
	}],
	haveTrendingAccess:{type:"boolean",default:false},
	tags:["String"],
	createdAt:{type:'date',default:Date.now}
},{collection: 'posts'});

module.exports = mongoose.model('Post',post);

